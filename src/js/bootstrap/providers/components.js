export const ComponentProvider = {
    scope: '#app',
    timeout: 10, // Stop checking if component loaded
    trap: false, // Set to true to prevent "blinking"
    trapId: 'lastView',
    globalStyles: document.querySelector('link[rel="stylesheet"]'),
    loadingClasses: "animate-pulse bg-gray-300 p-2 rounded-md".split(' '),
    componentLoadedEvent: 'alpine-component-loaded',
    register() {
        const scope = document.querySelector(this.scope);

        window.addEventListener('pinecone-end', (event) => {
            window.Alcata = {
                ...window.Alcata,
                components: [],
                componentsLoaded: 0,
                componentsProcessed: false,
            };

            this.addComponents(scope);

            if (window.Alcata.components.length == 0) {
                window.dispatchEvent(new CustomEvent(this.componentLoadedEvent));
            }
        });

        if (this.trap) {
            this.reinitTrap();
            window.PineconeRouter.settings.viewSelector = `#${this.trapId}`;
            window.addEventListener(this.componentLoadedEvent, () => {
                const trap = document.querySelector(`#${this.trapId}`);
                const old = Object.values(scope.childNodes);


                if (!trap.children) {
                    return;
                }

                for (const i in old) {
                    const child = old[i];
                    if (!child.isEqualNode(trap)) {
                        child.remove();
                    }
                }

                Object.values(trap.children).forEach(element => {
                    scope.appendChild(element);
                });
            });
        }
    },
    addComponents(parent) {
        const components = parent.querySelectorAll('x-component');
        const style = this.globalStyles;

        window.Alcata.components = [
            ...window.Alcata.components,
            ...Object.values(components)
        ];

        /** @type {Element} */
        components.forEach((element) => {
            if (!element.shadowRoot) {
                return;
            }

            const styleClone = style.cloneNode();
            element.shadowRoot.append(styleClone);
            element.classList.add(...this.loadingClasses);

            this.checkComponentDOM(element);
        });
    },
    reinitTrap() {
        const app = document.querySelector(this.scope);

        const template = document.createElement('div');
        template.id = this.trapId;
        template.style.setProperty('display', 'none', 'important');

        app.querySelector(`#${this.trapId}`)?.remove();
        app.appendChild(template);
    },
    checkComponentDOM(element) {
        const startTime = performance.now();

        const check = (currentTime) => {
            const elapsedTime = currentTime - startTime;

            if (elapsedTime > this.timeout * 1000) {
                this.onComponentFailed(element);
                return;
            }

            if (element.shadowRoot && element.shadowRoot.children.length > 1) {
                this.onComponentLoaded(element);
                return;
            }

            requestAnimationFrame(check);
        }

        check(startTime);
    },
    onComponentFailed(element) {
        this.updateComponentState(element);
    },
    onComponentLoaded(element) {
        element.classList.remove(...this.loadingClasses);

        this.addComponents(element.shadowRoot);

        this.appendScripts(element);
        this.updateComponentState(element);
    },
    updateComponentState(element) {
        window.Alcata.componentsLoaded++;

        if (
            !window.Alcata.componentsProcessed &&
            window.Alcata.componentsLoaded >= window.Alcata.components.length
        ) {
            window.Alcata.componentsProcessed = true;
            window.dispatchEvent(new CustomEvent(this.componentLoadedEvent));
        }
    },
    appendScripts(element) {
        const component = element.shadowRoot.lastElementChild;

        component.querySelectorAll('script').forEach((v) => {
            const nextEl = v.nextElementSibling ?? v.parentElement.firstElementChild;
            const parent = v.parentElement;

            const clone = document.createElement('script');
            clone.innerHTML = v.innerHTML;

            v.remove();


            if (nextEl) {
                parent.insertBefore(clone, nextEl);
            } else {
                parent.appendChild(clone);
            }
        });
    }
}
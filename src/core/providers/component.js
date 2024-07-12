export const ComponentProvider = ({
    scope = 'app',
    timeout = 10, // Stop checking if component loaded
    trap = false, // Set to true to prevent "blinking"
    trapId = 'lastView',
    globalStyles = document.querySelector('link[rel="stylesheet"]'),
} = {}) => {
    const loadingClasses = "animate-pulse bg-gray-300 p-2 rounded-md".split(' ');
    const componentLoadedEvent = 'alpine-component-loaded';

    let ComponentRegistry = {
        components: [],
        componentsLoaded: 0,
        componentsProcessed: false,
    };

    return {
        register() {
            const app = document.getElementById(scope);

            document.addEventListener('pinecone-end', (event) => {
                ComponentRegistry = {
                    ...ComponentRegistry,
                    components: [],
                    componentsLoaded: 0,
                    componentsProcessed: false,
                };

                this.addComponents(app);

                if (ComponentRegistry.components.length == 0) {
                    window.dispatchEvent(new CustomEvent(componentLoadedEvent));
                }
            });

            if (trap) {
                let trap = this.reinitTrap();
                window.PineconeRouter.settings.templateTargetId = `${trapId}`;
                window.addEventListener(componentLoadedEvent, () => {
                    const old = Object.values(app.childNodes);

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
                        app.appendChild(element);
                    });
                });
            }
        },
        addComponents(parent) {
            const components = parent.querySelectorAll('x-component');
            const style = globalStyles;

            ComponentRegistry.components = [
                ...ComponentRegistry.components,
                ...Object.values(components)
            ];

            /** @type {Element} */
            components.forEach((element) => {
                if (!element.shadowRoot) {
                    return;
                }

                const styleClone = style.cloneNode();
                element.shadowRoot.append(styleClone);
                element.classList.add(...loadingClasses);

                this.checkComponentDOM(element);
            });
        },
        reinitTrap() {
            const app = document.getElementById(scope);

            const template = document.createElement('div');
            template.id = trapId;
            template.style.setProperty('display', 'none', 'important');

            app.querySelector(`#${trapId}`)?.remove();
            app.appendChild(template);
            return template;
        },
        checkComponentDOM(element) {
            const startTime = performance.now();

            const check = (currentTime) => {
                const elapsedTime = currentTime - startTime;

                if (elapsedTime > timeout * 1000) {
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
            element.classList.remove(...loadingClasses);

            this.addComponents(element.shadowRoot);

            this.appendScripts(element);
            this.updateComponentState(element);
        },
        updateComponentState(element) {
            ComponentRegistry.componentsLoaded++;

            if (
                !ComponentRegistry.componentsProcessed &&
                ComponentRegistry.componentsLoaded >= ComponentRegistry.components.length
            ) {
                ComponentRegistry.componentsProcessed = true;
                window.dispatchEvent(new CustomEvent(componentLoadedEvent));
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
};
/**
 * @type {import("../alcata").ServiceProvider}
 */
export const ComponentProvider = {
    scope: '#app',
    timeout: 10, // Stop checking if component loaded
    globalStyles: document.querySelector('link[rel="stylesheet"]'),
    loadingClasses: "animate-pulse bg-gray-300 p-2 rounded-md".split(' '),
    register() {
        window.addEventListener('pinecone-end', () => {
            const components = document.querySelector(this.scope).querySelectorAll('x-component');
            const style = this.globalStyles;

            /** @type {Element} */
            components.forEach((element) => {
                if (!element.shadowRoot) {
                    return;
                }

                const styleClone = style.cloneNode();
                element.shadowRoot.append(styleClone);
                element.classList.add(...this.loadingClasses);

                this.checkShadowRootChildren(element);
            });

        });
    },
    checkShadowRootChildren(element) {
        const startTime = performance.now();

        const check = (currentTime) => {
            const elapsedTime = currentTime - startTime;

            if (elapsedTime > this.timeout * 1000) {
                return;
            }

            if (element.shadowRoot && element.shadowRoot.children.length > 1) {
                element.classList.remove(...this.loadingClasses);
                return;
            }

            requestAnimationFrame(check);
        }

        check(startTime);
    }
}
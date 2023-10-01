import { App } from "@capacitor/app";

export const Events = {
    init() {
        this.initBackButton();
    },
    initBackButton() {
        App.addListener('backButton', (e) => {
            const defaultBack = () => {
                if (!e.canGoBack) {
                    const sure = confirm('Are you sure you want to exit?');

                    if (sure) {
                        App.exitApp();
                    }

                    return;
                }
                window.history.back();
            }

            if (window.onback) {
                window.onback(e, defaultBack);
                return;
            }

            defaultBack();
        });

        window.addEventListener('pinecone-end', () => {
            // Resets onback handler
            if (window.onback) {
                window.onback = null;
            }
        });
    }
}
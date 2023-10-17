import { App } from "@capacitor/app";

export const MobileProvider = {
    register() {
        App.addListener('backButton', (e) => {
            const defaultBack = () => {
                if (!e.canGoBack) {
                    const sure = confirm(window.AlpineI18n?.t('app.exit') ?? 'Do you want to exit');

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
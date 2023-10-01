import { App } from "@capacitor/app";
import lang from "./lang.json";
import Alpine from "alpinejs";

export const Events = {
    init() {
        this.initBackButton();
        this.initTranslations();
    },
    initTranslations() {
        window.addEventListener('alpine:init', () => {
            const app = Alpine.store('app');

            window.AlpineI18n.fallbackLocale = app._defaultLocale;
            window.AlpineI18n.create(app._locale, lang);
        });
    },
    initBackButton() {
        App.addListener('backButton', (e) => {
            const defaultBack = () => {
                if (!e.canGoBack) {
                    const sure = confirm(window.AlpineI18n.t('app.exit'));

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
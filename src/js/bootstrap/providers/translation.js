import locale from '../../lang/locale.json';


/**
 * @type {import("../alcata").ServiceProvider}
 */
export const TranslationProvider = {
    locale: 'en',
    fallbackLocale: 'en',
    boot() {
        const app = window.Alpine.store('app');

        window.AlpineI18n.fallbackLocale = this.fallbackLocale;
        window.AlpineI18n.create(this.locale, locale);
    }
}
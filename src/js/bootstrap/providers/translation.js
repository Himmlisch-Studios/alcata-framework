import locale from '../../lang/locale.json';


export const TranslationProvider = {
    locale: 'en',
    fallbackLocale: 'en',
    boot() {
        window.AlpineI18n.fallbackLocale = this.fallbackLocale;
        window.AlpineI18n.create(this.locale, locale);
    }
}
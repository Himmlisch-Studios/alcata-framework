export const LocaleProvider = ({
    files = {},
    locale = 'en',
    fallbackLocale = 'en'
} = {}) => ({
    boot() {
        window.AlpineI18n.fallbackLocale = fallbackLocale;

        window.AlpineI18n.create(locale, files);
    }
})
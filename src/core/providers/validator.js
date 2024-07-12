import Validator from 'validatorjs';

export const ValidatorProvider = ({
    locale = 'en',
    files = {}
}) => ({
    register() {
        Validator.useLang(locale);

        for (const locale in files) {
            const file = files[locale];

            Validator.setMessages(locale, file);
        }
    }
})
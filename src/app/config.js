import en from '../lang/en.json';
import es from '../lang/es.json';
import routes from '../routes';

export default {
    basePath: '/',
    hash: true,
    scope: 'app',
    locale: 'en',
    fallbackLocale: 'en',
    locales: {
        en,
        es
    },
    routes
}
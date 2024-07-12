import { ComponentProvider } from "./providers/component";
import { MobileProvider } from "./providers/mobile";
import { RouterProvider } from "./providers/router";
import { LocaleProvider } from "./providers/locale";
import { ValidatorProvider } from "./providers/validator";

export default ({
    basePath = '/',
    hash = false,
    scope = 'app',
    locale = 'en',
    fallbackLocale = 'en',
    locales = {},
    routes = {}
} = {}) => ([
    RouterProvider({
        basePath,
        hash,
        scope,
        routes
    }),
    LocaleProvider({
        locale,
        fallbackLocale,
        files: locales
    }),
    ValidatorProvider({
        locale,
        files: locales
    }),
    MobileProvider(),
    ComponentProvider({
        scope,
        trap: true
    })
]);
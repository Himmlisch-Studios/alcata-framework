# Alcata Framework

Build cross-platform applications with the technologies you love!

Lossely coupled, zero-fat, lightweight, vanilla-flavored 🍦 yet featureful & opinionated JavaScript framework 🔥

It features:

- **Cross-Platform Integration** thanks to [Capacitor](https://capacitorjs.com/).
- **Reactivity** thanks to [AlpineJS](https://github.com/alpinejs/alpine).
- **Routing** with [Pinecone Router](https://github.com/pinecone-router/router).
- **Partials** with [Alpine Component](https://github.com/markmead/alpinejs-component).
- **Storage** with [Alpine Persist](https://alpinejs.dev/plugins/persist).
- **Localization** with [Alpine i18n](https://github.com/rehhouari/alpinejs-i18n).
- **Validation** with [Iodine](https://github.com/caneara/iodine).
- **Security** with [JS Obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) and [Encrypt Storage](https://github.com/michelonsouza/encrypt-storage).

With tailored helpers and configurations for a smooth development.

# Project Structure

```
├── dist/
├── src/
│   ├── css/
│   │   ├── base.css
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── alpine.js
│   │   ├── app.js
│   │   ├── bootstrap/
│   │   │   ├── alcata.js
│   │   │   └── providers/
│   │   │       ├── components.js
│   │   │       ├── mobile.js
│   │   │       ├── router.js
│   │   │       └── translation.js
│   │   │
│   │   ├── lang/
│   │   │   └── locale.json  # Language files
│   │   │
│   │   ├── stores/
│   │   │   └── app.js
│   │   │
│   │   ├── routes.js
│   │   └── storage.js
│   │
│   ├── components/ # HTML partials go here
│   │
│   ├── views/ # HTML pages go here
│   │
│   └── index.html
│
├── capacitor.config.json
├── tailwind.config.js
├── vite.config.ts
└── vite.util.ts
```

The entry point for Alcata is `/src/js/app.js`:

```js
import { System } from "./bootstrap/alcata";
import { Alpine } from "./alpine";
import app from "./stores/app";

Alpine.store('app', app);

System.boot();
```

Here, an Alpine instance with loaded plugins and custom magics is imported to load stores, `x-data` components, and everything you may need.  Then, the system is booted.

The `src/js/bootstrap/` directory, contains files that you shouldn't modify besides some configurations on the providers. 

The file `src/js/bootstrap/alcata.js` is where the Service Providers and Alpine are registered and initialized.

# Service Providers

Service Providers are small JavaScript objects that provide to Alcata, some extra functionality on top of the stack of libraries that the framework is built-on. They consist of two functions:
- A `register()` function, that runs before `Alpine.init()`.
- A `boot()` function, that runs after `Alpine.init()`.

They're meant to be left mostly unchanged, with the possibility of tweaking some configurations.

## Translation Provider

An example of this, is the TranslationProvider, that boots up [Alpine i18n](https://github.com/rehhouari/alpinejs-i18n), with the given locale and fallback locale:

```js
import locale from '../../lang/locale.json';

export const TranslationProvider = {
    locale: 'en',
    fallbackLocale: 'en',
    boot() {
        window.AlpineI18n.fallbackLocale = this.fallbackLocale;
        window.AlpineI18n.create(this.locale, locale);
    }
}
```

## Mobile Provider

Adds the option to set the `window.onback`, on your views to handle mobile back button events.

# Routing

You can define routes over `src/js/routes.js`. In any of the following ways:

```js
export default {
    '/': '/views/home.html',
    '/about/:redirect?': {
        handlers: [
            (context) => {
                if(context.params.redirect){
                    return context.redirect(context.params.redirect);
                }
            }
        ],
        view: ['/views/about.html']
    },
    notfound(context) {
        return context.redirect('/');
    }
};
```

- A string path to fetch a view.
- An object, with several options such `handlers` or `view`, specially useful for creating routes with Middlewares.
- A `Handler`, a method with the `Context` instance.

The routes will be loaded by the `RouterProvider`.

You can find more documentation over [Pinecone Router](https://github.com/pinecone-router/router). 

# State Management

Alcata comes with an `app` Alpine Store by default. And can be accessed through the magic function `$app`.

## Local Storage

You can save data easily using Alpine Persist. Just wrap the store property with `Alpine.$persist`  and an optional storage key with `as()`.

```js
{
    _firstTimeAt: Alpine.$persist(null).as('app:firstTimeAt'),
}
```

### Storage drivers

On `src/js/storage.js` you'll find very useful storage drivers for Alpine Persist.

```js
import { EncryptStorage as encryption } from "./storage";
import { CompressionStorage as compression } from "./storage";

{
    _secretValue: Alpine.$persist(null).as('app:secret').using(encryption),
    _compressedValue: Alpine.$persist(null).as('app:compressed').using(compression)
}
```

The `EncryptStorage` will use the `VITE_KEY` (set on your `.env` file), to encrypt the data using [encrypt-storage](https://github.com/michelonsouza/encrypt-storage). This is useful when you want to prevent the client reading/writing on the Local Storage as easily.

The `CompressionStorage` will compress the data using the LZ Algorithm. Useful for fighting the browser's Local Storage constraints.

# Components

**WIP**

# Localization

**WIP**

# Building

**WIP**

# Contributors

- [@LuanHimmlisch](https://github.com/LuanHimmlisch)
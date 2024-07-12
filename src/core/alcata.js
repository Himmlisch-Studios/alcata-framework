import Alpine from "alpinejs";

export const Alcata = {
    _registered: [],
    boot({
        plugins = [],
        magics = {},
        stores = {},
        providers = [],
        components = {},
    } = {}) {
        this.registerPlugins(plugins);
        this.registerMagics(magics);
        this.registerStores(stores);
        this.registerProviders(providers);
        this.registerComponents(components);

        Alpine.start();

        this.bootProviders();
    },
    // * ==== Providers ====
    registerProviders(providers = []) {
        providers.forEach((provider) => {
            if (provider.register) provider.register();
            this._registered.push(provider);
        });
    },
    bootProviders() {
        this._registered.forEach((provider) => {
            if (provider.boot) provider.boot();;
        });
    },
    // * ==== Plugins ====
    registerPlugins(plugins = []) {
        Alpine.plugin(plugins)
    },
    // * ==== Magics ====
    registerMagics(magics = {}) {
        for (const name in magics) {
            const magic = magics[name];

            Alpine.magic(name, magic);
        }
    },
    // * ==== Stores ====
    registerStores(stores = {}) {
        for (const name in stores) {
            let store = stores[name];

            if (typeof store === 'function') store = store();

            Alpine.store(name, store);
        }
    },
    // * ==== Components ====
    registerComponents(components = {}) {
        for (const name in components) {
            const component = components[name];

            Alpine.data(name, component);
        }
    },
}
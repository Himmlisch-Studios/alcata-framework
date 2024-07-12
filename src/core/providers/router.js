export const RouterProvider = ({
    basePath = '/',
    hash = false,
    scope = 'app',
    routes = {}
} = {}) => ({
    register() {
        window.PineconeRouter.settings.basePath = basePath;
        window.PineconeRouter.settings.hash = hash;
        window.PineconeRouter.settings.templateTargetId = scope;
        this.loadMiddlewares();
        this.loadRoutes();
    },
    loadMiddlewares() {
        if (window.PineconeRouterMiddlewares == null) {
            window.PineconeRouterMiddlewares = [];
        }
    },
    loadRoutes() {
        for (const key in routes) {
            const route = routes[key];

            let callback = route;

            if (route instanceof Function) {
                callback = {
                    handlers: [
                        route
                    ]
                };
            }

            if (typeof route === typeof '') {
                callback = {
                    template: [route]
                };
            }

            if (key === 'notfound') {
                window.PineconeRouter.notfound = callback;
            } else {
                window.PineconeRouter.add(key, callback);
            }

        }
    }
});
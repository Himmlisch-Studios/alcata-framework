import routes from "../../routes";

export const RouterProvider = {
    register() {
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
                    view: [route]
                };
            }

            if (key === 'notfound') {
                window.PineconeRouter.notfound = callback;
            } else {
                window.PineconeRouter.add(key, callback);
            }

        }
    }
}
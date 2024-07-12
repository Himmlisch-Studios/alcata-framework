import { Alcata } from "./core/alcata";
import plugins from "./core/plugins";
import providers from "./core/providers";

import config from "./app/config";

import * as magics from './app/magic';
import app from './app/stores/app';

import timer from "./app/components/timer";


Alcata.boot({
    plugins,
    magics,
    providers: [
        ...providers(config),
        // Custom providers
    ],
    components: {
        timer,
    },
    stores: {
        app,
    }
});
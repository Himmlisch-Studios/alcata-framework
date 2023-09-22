import 'pinecone-router-middleware-views';

import { App } from '@capacitor/app';

import Alpine from 'alpinejs'
import PineconeRouter from 'pinecone-router';
import persist from '@alpinejs/persist'


Alpine.plugin(PineconeRouter);
Alpine.plugin(persist);

App.addListener('backButton', (e) => {
    const defaultBack = () => {
        if (!e.canGoBack) {
            App.exitApp();
            return;
        }
        window.history.back();
    }

    if (window.onback) {
        window.onback(e, defaultBack);
        return;
    }

    defaultBack();
});

window.addEventListener('pinecone-end', () => {
    // Resets onback handler
    if (window.onback) {
        window.onback = null;
    }
});

// Alpine.store('app', {
//     init() {
//         Alpine.effect(() => {

//         });
//     }
// });


Alpine.start();

window.Alpine = Alpine;
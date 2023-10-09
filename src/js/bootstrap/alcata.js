import { Alpine } from "../alpine";
import { MobileProvider } from "./providers/mobile";
import { RouterProvider } from "./providers/router";
import { TranslationProvider } from "./providers/translation";

/**
 * @typedef ServiceProvider
 * @property {function} [register] - Runs before Alpine initialization
 * @property {function} [boot] - Runs after Alpine init
 */

export const System = {
    /** @type {ServiceProvider[]} */
    services: [
        RouterProvider,
        TranslationProvider,
        MobileProvider,
    ],
    boot() {
        this.registerProviders();

        Alpine.start();
        window.Alpine = Alpine;

        this.bootProviders();
    },
    registerProviders() {
        this.services.forEach((service) => service.register && service.register());
    },
    bootProviders() {
        this.services.forEach((service) => service.boot && service.boot());
    }
}
import { Alpine } from "../alpine";
import { ComponentProvider } from "./providers/components";
import { MobileProvider } from "./providers/mobile";
import { RouterProvider } from "./providers/router";
import { TranslationProvider } from "./providers/translation";

export const System = {
    services: [
        RouterProvider,
        TranslationProvider,
        MobileProvider,
        ComponentProvider
    ],
    boot() {
        window.Alcata = {};
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
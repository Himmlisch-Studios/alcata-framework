import 'pinecone-router-middleware-views';

import Alpine from 'alpinejs'
import PineconeRouter from 'pinecone-router';
import component from 'alpinejs-component'
import { Events } from './events';
import state from './state';
import AlpineI18n from "alpinejs-i18n";

Alpine.plugin(PineconeRouter);
Alpine.plugin(component);
Alpine.plugin(AlpineI18n);

Alpine.store('app', state);

Events.init();
Alpine.start();

window.Alpine = Alpine;
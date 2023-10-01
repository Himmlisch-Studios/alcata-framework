import 'pinecone-router-middleware-views';

import Alpine from 'alpinejs'
import PineconeRouter from 'pinecone-router';
import component from 'alpinejs-component'
import { Events } from './events';
import state from './state';

Alpine.plugin(PineconeRouter);
Alpine.plugin(component);

Events.init();

Alpine.start();

Alpine.store('app', state);


window.Alpine = Alpine;
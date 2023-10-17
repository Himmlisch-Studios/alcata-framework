/* Middlewares  */
import 'pinecone-router-middleware-views';

import alpine from 'alpinejs'
import PineconeRouter from 'pinecone-router';
import component from 'alpinejs-component'
import AlpineI18n from "alpinejs-i18n";
import persist from '@alpinejs/persist';
import Iodine from '@caneara/iodine';
import timer from './components/timer';

/* Plugins  */
alpine.plugin(PineconeRouter);
alpine.plugin(component);
alpine.plugin(AlpineI18n);
alpine.plugin(persist);

/** Magics */
alpine.magic('app', (el, { Alpine }) => Alpine.store('app'));
alpine.magic('validator', () => new Iodine());

/** Components */
alpine.data('timer', timer);

export const Alpine = alpine;
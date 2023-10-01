import Alpine from "alpinejs";
import persist from '@alpinejs/persist'

Alpine.plugin(persist);

export default {
    /**
     * @type {Date|null}
     */
    _firstTimeAt: Alpine.$persist(null).as('app:firstTimeAt'),
    init() {
        this.initFirstTime();
        this.initWatch();
    },
    initFirstTime() {
        setTimeout(() => this._firstTimeAt == null && (this._firstTimeAt = new Date), 100); // Delay to allow check first timers
    },
    initWatch() {
        Alpine.effect(() => {
            /* Your code goes here */
        });
    }
};
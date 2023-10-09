import { Alpine } from "../alpine";
// import { EncryptStorage as encryption } from "./storage";
// import { CompressionStorage as compression } from "./storage";

export default {
    /**
     * @type {Date|null}
     */
    _firstTimeAt: Alpine.$persist(null).as('app:firstTimeAt'),
    // _secretValue: Alpine.$persist(null).as('app:secret').using(encryption),
    // _compressedValue: Alpine.$persist(null).as('app:compressed').using(compression),
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
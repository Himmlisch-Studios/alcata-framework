import Validator from 'validatorjs';

/** @typedef {(el: import('alpinejs').ElementWithXAttributes, options: import('alpinejs').MagicUtilities) => unknown} Magic */

/** @type {Magic} */
export const app = (el, { Alpine }) => Alpine.store('app');

/** @type {Magic} */
export const validator = () => (data, rules, customMessages) => {
    const validator = new Validator(data, rules, customMessages);
    return validator.passes() ? true : validator.errors;
};
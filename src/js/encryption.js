import { EncryptStorage as Storage } from "encrypt-storage";

export const EncryptStorage = {
    storage: new Storage(import.meta.env.VITE_KEY),
    getItem(key) {
        const value = this.storage.getItem(key);

        return JSON.stringify(value);
    },
    setItem(key, value) {
        this.storage.setItem(key, value);
    }
};
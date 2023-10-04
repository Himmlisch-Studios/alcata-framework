import { EncryptStorage as Storage } from "encrypt-storage";
import LZString from 'lz-string';

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

export const CompressionStorage = {
    storage: LZString,
    getItem(key) {
        const value = localStorage.getItem(key);

        if (!value) {
            return JSON.stringify(value);
        }

        return this.storage.decompressFromUTF16(value);
    },
    setItem(key, value) {
        const compressed = this.storage.compressToUTF16(value);

        localStorage.setItem(key, compressed);
    }
}
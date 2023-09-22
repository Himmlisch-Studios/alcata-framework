import { defineConfig } from 'vite';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
    root: './src',
    build: {
        outDir: '../dist',
        minify: false,
        emptyOutDir: true,
    },
    json: {
        stringify: true
    },
    plugins: [
        obfuscatorPlugin({
            include: ['src/js/**/*.js'],
            exclude: [/node_modules/],
            options: {
                controlFlowFlattening: true,
                deadCodeInjection: true,
                debugProtection: true,
                disableConsoleOutput: true,
                numbersToExpressions: true,
                // renameProperties: true,
                // selfDefending: true
            }
        })
    ],
});

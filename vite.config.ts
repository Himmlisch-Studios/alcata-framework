import { defineConfig } from 'vite';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

const isProduction = process.env.NODE_ENV == 'production';

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
        ...(isProduction ? [
            obfuscatorPlugin({
                include: ['src/js/**/*.js'],
                exclude: [/node_modules/],
                options: {
                    controlFlowFlattening: true,
                    deadCodeInjection: true,
                    debugProtection: true,
                    disableConsoleOutput: true,
                    numbersToExpressions: true,
                    // renameProperties: true, //! May break Alpine
                    // selfDefending: true //! May break Alpine
                }
            })
        ] : [])
    ],
});

import { defineConfig, loadEnv } from 'vite';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';
import { createHtmlPlugin } from 'vite-plugin-html';

import { ForceReloadPlugin, collectHTMLFiles } from './vite.util';

export default async ({ mode }) => {
    const isProduction = process.env.NODE_ENV == 'production';

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const extraPaths = await collectHTMLFiles([
        'src/views',
        'src/components',
    ]);


    return defineConfig({
        root: './src',
        build: {
            outDir: '../dist',
            minify: 'terser',
            emptyOutDir: true,
            terserOptions: {
                compress: true,
                format: {
                    comments: false
                }
            },
            rollupOptions: {
                input: {
                    main: 'src/index.html',
                    ...extraPaths
                }
            },
            // chunkSizeWarningLimit: 3000, // Configure to prevent size warning
        },
        json: {
            stringify: true
        },
        plugins: [
            ...(isProduction ? [
                createHtmlPlugin({
                    minify: true,
                }),
                obfuscatorPlugin({
                    include: ['src/js/**/*.js'],
                    exclude: [/node_modules/],
                    options: {
                        controlFlowFlattening: true,
                        deadCodeInjection: true,
                        debugProtection: true,
                        disableConsoleOutput: true,
                        numbersToExpressions: true,
                        simplify: true,
                        selfDefending: true,
                        // renameProperties: true, //! May break Alpine
                    }
                })
            ] : [
                ForceReloadPlugin
            ]),
        ],
    })
};

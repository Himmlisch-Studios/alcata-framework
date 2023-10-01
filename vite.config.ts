import { PluginOption, defineConfig, loadEnv } from 'vite';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

const isProduction = process.env.NODE_ENV == 'production';

const fullReloadAlways: PluginOption = {
    handleHotUpdate({ server }) {
        server.ws.send({ type: "full-reload" });
    }
} as PluginOption

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        root: './src',
        build: {
            outDir: '../dist',
            minify: true,
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
            ] : [
                fullReloadAlways
            ]),
        ],
    })
};

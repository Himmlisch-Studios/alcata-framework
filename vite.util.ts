import { PluginOption } from "vite";

import fs from 'fs';
import path from 'path';

export async function collectHTMLFiles(dirs: string[]): Promise<string[]> {
    const files: string[] = [];

    for (const dir of dirs) {
        const entries = await fs.promises.readdir(dir);

        for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            const stats = await fs.promises.stat(entryPath);

            if (stats.isDirectory()) {
                const nestedFiles = await collectHTMLFiles([entryPath]);
                files.push(...nestedFiles);
            } else if (entry.endsWith('.html')) {
                files.push(entryPath);
            }
        }
    }

    return files;
}

export const ForceReloadPlugin: PluginOption = {
    handleHotUpdate({ server }) {
        server.ws.send({ type: "full-reload" });
    }
} as PluginOption;
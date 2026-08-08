import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function loadCommands(directory, registry) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const loaded = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.js')) continue;

    const filePath = path.join(directory, entry.name);
    const module = await import(pathToFileURL(filePath).href);

    if (!module.data || typeof module.execute !== 'function') continue;

    registry.register(module);
    loaded.push(module.data.name);
  }

  return loaded;
}

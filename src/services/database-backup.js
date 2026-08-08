import fs from 'node:fs/promises';
import path from 'node:path';

export function createDatabaseBackupService(database) {
  async function backup(destination) {
    const resolved = path.resolve(destination);
    await fs.mkdir(path.dirname(resolved), { recursive: true });
    await database.database.run(`VACUUM INTO ?`, resolved);
    return resolved;
  }

  return Object.freeze({ backup });
}

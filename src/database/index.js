import { createDatabase } from './sqlite.js';
import { runMigrations } from './migrations.js';

export async function createDatabaseService(databasePath) {
  const database = await createDatabase(databasePath);
  await runMigrations(database);

  return Object.freeze({
    database,
    close: () => database.close(),
  });
}

export function createHealthService({ database, client }) {
  async function check() {
    const startedAt = process.uptime();
    let databaseOk = false;

    try {
      await database.database.get('SELECT 1 AS ok');
      databaseOk = true;
    } catch {
      databaseOk = false;
    }

    return {
      status: databaseOk && client.isReady() ? 'ok' : 'degraded',
      uptimeSeconds: Math.floor(startedAt),
      database: databaseOk ? 'ok' : 'error',
      discord: client.isReady() ? 'ready' : 'not-ready',
      timestamp: new Date().toISOString(),
    };
  }

  return Object.freeze({ check });
}

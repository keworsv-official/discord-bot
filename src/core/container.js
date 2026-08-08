export function createContainer({ config, logger, database = null, services = {} }) {
  return {
    config,
    logger,
    database,
    services,
  };
}

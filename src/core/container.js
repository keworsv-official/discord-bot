export function createContainer({ config, logger, database = null }) {
  return {
    config,
    logger,
    database,
  };
}

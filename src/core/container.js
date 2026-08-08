export function createContainer({ config, logger }) {
  return Object.freeze({
    config,
    logger,
  });
}

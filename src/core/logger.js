const levels = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export function createLogger({ level = 'info' } = {}) {
  const threshold = levels[level] ?? levels.info;

  function write(name, message, meta) {
    if (levels[name] < threshold) return;

    const timestamp = new Date().toISOString();
    const suffix = meta === undefined ? '' : ` ${JSON.stringify(meta)}`;
    const output = `[${timestamp}] [${name.toUpperCase()}] ${message}${suffix}`;

    if (name === 'error') {
      console.error(output);
      return;
    }

    if (name === 'warn') {
      console.warn(output);
      return;
    }

    console.log(output);
  }

  return {
    debug: (message, meta) => write('debug', message, meta),
    info: (message, meta) => write('info', message, meta),
    warn: (message, meta) => write('warn', message, meta),
    error: (message, meta) => write('error', message, meta),
  };
}

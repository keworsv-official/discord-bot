export function createCommandRegistry() {
  const commands = new Map();

  function register(command) {
    if (!command?.data?.name || typeof command.execute !== 'function') {
      throw new TypeError('A command must expose data.name and execute().');
    }

    if (commands.has(command.data.name)) {
      throw new Error(`Command already registered: ${command.data.name}`);
    }

    commands.set(command.data.name, command);
  }

  function get(name) {
    return commands.get(name);
  }

  function all() {
    return [...commands.values()];
  }

  return Object.freeze({ register, get, all });
}

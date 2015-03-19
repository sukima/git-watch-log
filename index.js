var GitWatcher = require('./lib/watcher');

module.exports = {
  Watcher:             GitWatcher,
  JsonWatcher:         require('./lib/json-watcher'),
  TerminalWatcher:     require('./lib/terminal-watcher'),
  NotImplementedError: GitWatcher.NotImplementedError
};

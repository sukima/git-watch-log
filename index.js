var GitWatcher = require('./lib/watcher');

module.exports = {
  Watcher:             GitWatcher,
  TerminalWatcher:     require('./lib/terminal-watcher'),
  NotImplementedError: GitWatcher.NotImplementedError
};

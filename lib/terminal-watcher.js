var Util       = require('util');
var GitWatcher = require('./watcher');
var Promise    = require('bluebird');

var gitLog = [
  'log', '--all', '--graph',
  '--pretty=format:"%Cred%h%Creset',
  '-%C(yellow)%d%Creset',
  '%s %Cgreen(%cr)',
  '%Cblue<%an>%Creset"',
  '--abbrev-commit',
  '--date=relative'
].join(' ');

var gitStatus = 'status -sb';

function GitTerminalWatcher() {
  GitWatcher.apply(this, arguments);
}
Util.inherits(GitTerminalWatcher, GitWatcher);

GitTerminalWatcher.prototype._refresh = function() {
  return Promise.join(
    this.execGit(gitStatus),
    this.execGit(gitLog),
    function(status, log) {
      return '\033c' + status + '\n' + log;
    }
  );
};

module.exports = GitTerminalWatcher;

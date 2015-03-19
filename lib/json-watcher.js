var Util       = require('util');
var GitWatcher = require('./watcher');
var Promise    = require('bluebird');

var gitLog = [
  'log', '--all',
  '--pretty="tformat:%h%n%aN%n%at%n%p%n%D%n%s"',
  '--date=local'
].join(' ');

var gitStatus = 'status --porcelain';

function refsFrom(refs) {
  if (refs == null || refs === '') {
    return [];
  } else {
    return refs.split(/,\s*/);
  }
}

var parseStatus = function(status) {
  var lines = status.split('\n');
  var line, files = [];
  while (lines.length > 1) {
    line = lines.shift();
    files.push({
      status: line.substr(0, 2),
      path:   line.substr(3)
    });
  }
  return files;
};

var parseLog = function(log) {
  var lines = log.split('\n');
  var commits = [];
  while (lines.length > 1) {
    commits.push({
      hash:    lines.shift(),
      author:  lines.shift(),
      time:    lines.shift(),
      parent:  lines.shift(),
      refs:    refsFrom(lines.shift()),
      subject: lines.shift()
    });
  }
  return commits;
};

function GitJsonWatcher() {
  GitWatcher.apply(this, arguments);
}
Util.inherits(GitJsonWatcher, GitWatcher);

GitJsonWatcher.prototype._refresh = function() {
  return Promise.join(
    this.execGit(gitStatus),
    this.execGit(gitLog),
    function(statusOutput, logOutput) {
      return {
        working:  parseStatus(statusOutput[0]),
        commits: parseLog(logOutput[0])
      };
    }
  );
};

module.exports = GitJsonWatcher;

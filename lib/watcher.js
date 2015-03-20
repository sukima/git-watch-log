var Util         = require('util');
var path         = require('path');
var EventEmitter = require('events').EventEmitter;
var Promise      = require('bluebird');
var chokidar     = require('chokidar');
var execAsync    = Promise.promisify(require('child_process').exec);

var globPatterns = ['**', '.git/**'];

var debounce = function(ctx, fn, delay) {
  var timer = null;
  return function() {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(ctx, args);
    }, delay);
  };
};

function GitWatcher(projectPath) {
  EventEmitter.call(this);
  this.projectPath = projectPath;
}
Util.inherits(GitWatcher, EventEmitter);

GitWatcher.prototype._refresh = function() {
  throw new GitWatcher.NotImplementedError(
    'You must implement the _refresh method.'
  );
};

GitWatcher.prototype.refresh = function() {
  Promise.try(this._refresh.bind(this))
    .bind(this)
    .then(function(output) {
      this.emit('refresh', output);
    })
    .catch(function(err) {
      this.emit('error', err);
    });
  return this;
};

GitWatcher.prototype.watch = function() {
  var globs = globPatterns.map(function(glob) {
    return path.resolve(path.join(this.projectPath, glob));
  }.bind(this));
  this.refresh();
  this.watcher = chokidar.watch(globs, {ignoreInitial: true})
    .on('all', debounce(this, this.refresh, 400));
  return this;
};

GitWatcher.prototype.close = function() {
  if (this.watcher) {
    this.watcher.close();
  }
  return this;
};

GitWatcher.prototype.execGit = function(command) {
  return execAsync('git ' + command, {cwd: this.projectPath});
};

GitWatcher.NotImplementedError = function() {
  Error.apply(this, arguments);
};
Util.inherits(GitWatcher.NotImplementedError, Error);

module.exports = GitWatcher;

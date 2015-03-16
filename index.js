var chokidar = require('chokidar');
var path     = require('path');
var exec     = require('child_process').exec;

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

var clear = function() {
  console.log('\033c');
};

var debounce = function(fn, delay) {
  var timer = null;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
};

var execGit = function(command, cwd) {
  return function() {
    exec('git ' + command, {cwd: cwd}, function(err, stdout, stderr) {
      if (err) {
        console.error(stderr);
        return;
      }
      console.log(stdout);
    });
  };
};

module.exports = function(projectPath) {
  var glob   = path.resolve(path.join(projectPath, '.git/**'));
  var status = execGit('status -sb', projectPath);
  var logger = execGit(gitLog, projectPath);
  var update = function() {
    clear();
    status();
    logger();
  };
  update();
  return chokidar.watch(glob, {ignoreInitial: true})
    .on('all', debounce(update, 400));
};

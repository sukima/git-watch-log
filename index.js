var chokidar = require('chokidar');
var path     = require('path');
var exec     = require('child_process').exec;

var gitLog = [
  'git', 'log', '--all', '--graph',
  '--pretty=format:"%Cred%h%Creset',
  '-%C(yellow)%d%Creset',
  '%s %Cgreen(%cr)',
  '%Cblue<%an>%Creset"',
  '--abbrev-commit',
  '--date=relative'
].join(' ');

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

var showLog = function(cwd) {
  return function() {
    exec(gitLog, {cwd: cwd}, function(err, stdout, stderr) {
      if (err) {
        console.error(stderr);
        return;
      }
      clear();
      console.log(stdout);
    });
  };
};

module.exports = function(projectPath) {
  var glob = path.resolve(path.join(projectPath, '.git/**'));
  return chokidar.watch(glob)
    .on('all', debounce(showLog(projectPath), 400));
};

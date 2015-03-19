#!/usr/bin/env node
var GitWatcher = require('./');
var args       = require('optimist').argv;
var projectDir, watcher;

if (args.h || args.help) {
  console.log([
    'Usage: git-watch-log [--json] [projectDir]',
    '  projectDir defaults to current directory',
    '  -j, --json  output in JSON format',
    'Press CTRL-C to exit.'
  ].join('\n'));
  process.exit(0);
}

var jsonMode = (args.j || args.json);

projectDir = args._[0] || process.cwd();

if (jsonMode) {
  watcher = new GitWatcher.JsonWatcher(projectDir);
} else {
  watcher = new GitWatcher.TerminalWatcher(projectDir);
}

process.on('SIGINT', function() {
  watcher.close();
  process.exit(0);
});

watcher.on('error', function(output) {
  console.error(output);
});

if (jsonMode) {
  watcher
    .on('refresh', function(output) {
      console.log(JSON.stringify(output));
      process.exit(0);
    })
    .on('error', function(output) {
      process.exit(1);
    })
    .refresh();
} else {
  watcher
    .on('refresh', function(output) {
      console.log(output);
    })
    .watch();
}

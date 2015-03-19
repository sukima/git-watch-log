#!/usr/bin/env node
var GitWatcher = require('./');
var args       = require('optimist').argv;
var projectDir, watcher;

if (args.h || args.help) {
  console.log([
    'Usage: git-watch-log [projectDir]',
    '  projectDir defaults to current directory',
    'Press CTRL-C to exit.'
  ].join('\n'));
  process.exit(0);
}

projectDir = args._[0] || process.cwd();

watcher = new GitWatcher.TerminalWatcher(projectDir);

process.on('SIGINT', function() {
  watcher.close();
  process.exit(0);
});

watcher.on('error', function(output) {
  console.error(output);
});

watcher
  .on('refresh', function(output) {
    console.log(output);
  })
  .watch();

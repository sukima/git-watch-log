#!/usr/bin/env node
var projectDir, watcher;
var GitWatcher = require('./');

var argv = require('yargs')
  .usage('Usage: git-watch-log [--json] [--dir=<projectDir>]')
  .help('help').alias('help', 'h')
  .options({
    json: {
      alias:       'j',
      boolean:     true,
      description: 'Output in JSON format.'
    },
    dir: {
      alias:       'd',
      requiresArg: true,
      default:     './',
      description: 'The git repo working directory.'
    }
  })
  .epilogue('Press CTRL-C to exit a running program.')
  .argv;

projectDir = argv.dir === './' ? process.cwd() : argv.dir;

if (argv.json) {
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

if (argv.json) {
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
      console.log('\033c' + output);
    })
    .watch();
}

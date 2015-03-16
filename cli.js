#!/usr/bin/env node

var gitLogWatch = require('./');

var projectPath = process.argv[2] || process.cwd();

var watcher = gitLogWatch(projectPath);

process.on('SIGINT', function() {
  watcher.close();
  process.exit(0);
});

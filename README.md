# Git Watch Log

This is a simple command to watch a git repo and print out a condescend
status and a graph of the commits. The intent is to provide a teaching
tool for experimentation and presentations.

I wrote this because I wanted an automatic representation of the current
state of things in a git repo. I use this while teaching git so students
can see how each command effects the log and status in real time.

Don't forget to check out [git-watch-web][] the web based / d3 / socket.io
companion for this.

[git-watch-web]: https://www.npmjs.com/package/git-watch-web

![Screen Shot](/../screenshots/screen-shot.png?raw=true)

## Install

This is a [Node.js](https://nodejs.org/) project and is packaged through
NPM:

    $ npm install -g git-watch-log

## Usage

The above will install a command called `git-watch-log`.

Executing will watch the current directory's git repo. You can also pass the
repo directory as the first argument.

    $ git-watch-log /path/to/repo

## License

                 DO WHAT YOU WANT TO PUBLIC LICENSE
                      Version 3, December 2012
    
     Copyright (C) 2012 Devin Weaver <suki@tritarget.org>
    
     Everyone is permitted to copy and distribute verbatim or modified
     copies of this license document, and changing it is allowed as long
     as the name and author are changed.
    
                 DO WHAT YOU WANT TO PUBLIC LICENSE
     TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
    
      0. You just DO WHAT YOU WANT TO.
    
      1. Attribution is OPTIONAL, however, APPRECIATED.
    
     TERMS AND CONDITIONS FOR FITNESS FOR PURPOSE
    
      0. USAGE of any material, in whole or in part, comes WITHOUT WARRANTY.
    
      1. To the extent permitted by applicable law, This license offers no
         claim of FITNESS FOR PURPOSE.

#!/usr/bin/env node

var path = require("path"),
  fs = require("fs"),
  rootdir = process.argv[2],
  shell;
try {
	shelljs = require('shelljs');
} catch (ex) {
console.log('---------------------------------------------------------')
console.log('Shelljs is required')
console.log('Either run npm install')
console.log('Or run ionic setup sass')
console.log('---------------------------------------------------------')
	process.exit(1);
}

try {
  fs.lstatSync(rootdir + "/assets").isDirectory();
  console.log("Already setup, nothing to do here")
} catch (e) {
  console.log("Making Assets Folder");
  shell.mkdir("-p", rootdir + "/assets");
};

process.exit(0);

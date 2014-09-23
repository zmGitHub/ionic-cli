#!/usr/bin/env node

var path = require("path"),
  fs = require("fs"),
  shell = require("shelljs"),
  rootdir = process.argv[2];
try {
  fs.lstatSync(rootdir + "/assets").isDirectory();
  console.log("Already setup, nothing to do here")
} catch (e) {
  console.log("Making Assets Folder");
  shell.mkdir("-p", rootdir + "/assets");
};

process.exit(0);

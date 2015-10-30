var fs = require('fs'),
    path = require('path'),
    inquirer = require('inquirer'),
    Task = require('./task').Task,
    ionicAppLib = require('ionic-app-lib'),
    Generate = ionicAppLib.generate,
    Q = require('q'),
    Utils = ionicAppLib.utils,
    logging = ionicAppLib.logging,
    Info = ionicAppLib.info;

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.run = function(ionic, argv) {
  /*
      Usage: `ionic generate` or `ionic g`
      ionic generate <generator> <name>

      ionic g page about             * generate page in pwd/www/app/about - about.html, about.js, about.scss
      ionic g page about --tabs
  */
  try {    
    var generator = argv._[1];
    var name = argv._[2];
    var promise;

    var ionicFrameworkModuleName = 'ionic-framework';
    // var ionicFrameworkModuleName = 'ionic2';
    var ionicModulePath = path.join(process.cwd(), 'node_modules', ionicFrameworkModuleName);
    var ionicGenerateModule;

    try {
      ionicModule = require(ionicModulePath);
      ionicGenerateModule = ionicModule.generate;
      return ionicGenerateModule.generate({appDirectory: process.cwd(), generatorName: generator, inquirer: inquirer, name: name, q: Q});
    } catch (ex) {
      // console.log('ex', ex);
      return Utils.fail('You do not appear to have a compatible version of Ionic v2 installed.\n' +
      'Ionic Framework v2 version 2.0.0-alpha.39 or later is required to use the generators.\n' + 
      'Please run: "npm install ionic-framework"');
    }

  } catch (ex) {
    Utils.fail('There was an error generating your item:', ex);
  }
}

exports.IonicTask = IonicTask;

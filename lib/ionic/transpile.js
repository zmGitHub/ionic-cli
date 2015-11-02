var IonicAppLib = require('ionic-app-lib'),
    Task = require('./task').Task,
    Transpile = IonicAppLib.v2.transpile,
    IonicProject = IonicAppLib.v2.project;

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.run = function run(ionic, argv) {
  var self = this;
  this.ionic = ionic;
  var cwd = process.cwd();
  var config = IonicProject.loadConfig(cwd);
  var sassEntryFile = config.get('sassEntryFile') || '/www/app/app.scss';
  var sassIncludePaths = config.get('sassIncludePaths') || ['node_modules/ionic-framework/src/scss'];
  var sassOutputFile = config.get('sassOutputFile') || 'www/build/css/app.css'
  var fontsOutputPath = config.get('fontsOutputPath') || '/www/build/fonts';

  if (!argv._[1]) {
    // no option, so do it all
    return Transpile.compile(cwd, false, function() {
      console.log('√ Compiling files complete.'.green.bold);
    })
    .then(function() {
      return Transpile.processSass(cwd, sassEntryFile, sassIncludePaths, sassOutputFile);
    })
    .then(function() {
      return Transpile.prepareFonts(cwd, fontsOutputPath);
    });
  } if (argv._[1] == 'code') {
    return Transpile.compile(cwd, false, function() {
      console.log('√ Compiling files complete.'.green.bold);
    })
  } else if (argv._[1] == 'sass') {
    return Transpile.processSass(cwd, sassEntryFile, sassIncludePaths, sassOutputFile);
  } else if (argv._[1] == 'fonts') {
    return Transpile.prepareFonts(cwd, fontsOutputPath);
  } else {

  }

};

exports.IonicTask = IonicTask;

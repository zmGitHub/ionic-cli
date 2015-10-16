var argv = require('optimist').argv,
    shelljs = require('shelljs'),
    Task = require('./task').Task,
    IonicStats = require('./stats').IonicStats,
    IonicAppLib = require('ionic-app-lib'),
    Hooks = IonicAppLib.hooks;

shelljs.config.silent = true;

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.run = function run(ionic) {
  this.ionic = ionic;

  var cmd = argv._[1];
  try {

    switch(cmd) {
      case 'add':
        Hooks.add(process.cwd());
        break;
      case 'remove':
        Hooks.remove(process.cwd());
        break;
      case 'perm':
      case 'permissions':
        Hooks.setHooksPermission(process.cwd());
        break;
      default:
        console.log('Please supply a command - either add or remove'.red.bold);
    }
  } catch (ex) {
    console.log('error:', ex, ex.stack);
  }

  IonicStats.t();

};

exports.IonicTask = IonicTask;

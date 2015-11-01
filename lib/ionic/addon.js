require('shelljs/global')

var Task = require('./task').Task,
    IonicCordova = require('./cordova').IonicTask,
    IonicStats = require('./stats').IonicStats,
    // argv = require('optimist').argv,
    fs = require('fs'),
    Q = require('q'),
    ioLib = require('ionic-app-lib').ioConfig,
    path = require('path'),
    IonicAppLib = require('ionic-app-lib'),
    Addon = IonicAppLib.addon,
    Login = IonicAppLib.login,
    LoginTask = require('./login'),
    Utils = IonicAppLib.utils,
    bower = require('./bower');

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.installBowerComponent = function installBowerComponent(componentName) {
  var bowerInstallCommand = 'bower install --save-dev ' + componentName;

  var result = exec(bowerInstallCommand);

  if (result.code != 0) {
    //Error happened, report it.
    var errorMessage = 'Failed to find the bower component "'.error.bold + componentName.verbose + '"'.error.bold + '.\nAre you sure it exists?'.error.bold;
    this.ionic.fail(errorMessage, 'add');
  } else {
    var message = 'Bower component installed - ' + componentName;
    console.log(message.green)
  }
}

// Need to look at bower.json of package just installed and look for any cordova plugins required
// Check the directory in the projects `.bowerrc` file
// Then go to /path/to/bower/components/<ionic-service-componentName>/ionic-plugins.json - 'plugins'
// For each plugins - call 'ionic add plugin <current-required-plugin>'
IonicTask.prototype.run = function(ionic, argv) {
  //console.log('running ', argv._)
  this.ionic = ionic;

  IonicStats.t();

  var action = argv._[1]
  var addonName = argv._[2];
  var addonPlan = argv._[3];

  if(!addonName) {
    this.ionic.fail('You must provide the name of an addon to add', 'service')
  }

  var jar;

  return Login.retrieveLogin()
    .then(function(jar) {
      if (!jar) {
        console.log('No previous login existed. Attempting to log in now.');
        return LoginTask.login(argv);
      }
      return jar;
    })
    .then(function(j) {
      jar = j;

      return Addon.add(addonName, addonPlan);
    })
    .then(function(body) {
      console.success('Added "' + addonName + '".');
    }, function(err) {
      return Q.reject(new Error(err));
    })
    .catch(function(ex) {
      Utils.fail(ex, 'addon');
    });
}

exports.IonicTask = IonicTask;

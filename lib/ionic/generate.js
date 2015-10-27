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

var CliGenerate = module.exports;

CliGenerate.inquirePageType = function inquirePageType() {
  var q = Q.defer();

  inquirer.prompt([
    {
      type: 'list',
      name: 'generator',
      message: 'What page do want to generate?',
      choices: [ 'Blank', 'Tabs' ],
      filter: function(val) { return val.toLowerCase(); }
    }
  ], function( answers ) {
    console.log( JSON.stringify(answers, null, "  ") );
    q.resolve(answers.generator);
  });

  return q.promise;
}

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.run = function(ionic, argv) {

  /*
      Usage: `ionic generate` or `ionic g`
      ionic generate <generator> <name>

      ionic g page about             * generate page in pwd/www/app/about - about.html, about.js, about.scss
  */
  try {    
    var generator = argv._[1];
    var name = argv._[2];
    var promise;

    if (!generator) {
      logging.logger.debug('No generator was passed.', generator);
    }
    if (!name) {
      logging.logger.debug('No generator name was passed.', name);
      throw new Error('no generator name passed');
      // promise = CliGenerate.inquireName();
    }

    if (!generator) {
      promise = CliGenerate.inquirePageType();
    } else {
      promise = Q(generator);
    }

    return promise
    .then(function(generator) {
      if (generator === 'page') {
        logging.logger.info('Generating', name.blue, 'page\n');
        return Generate.page(process.cwd(), name);
      }
    })
    .then(function(val) { 
      logging.logger.info('\n√ Completed\n'.green);
    })
    .catch(function(ex) {
      console.log('error with this', ex);
      throw ex;
    });

  } catch (ex) {
    Utils.fail('There was an error generating your item:', ex);
  }
}

exports.IonicTask = IonicTask;

require('shelljs/global')

var Task = require('./task').Task,
    IonicAppLib = require('ionic-app-lib'),
    Release = IonicAppLib.release;

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.run = function run(ionic, argv, callback) {
  // console.log('hi');
  // console.log(Release);
  var platform = argv._[1] || 'ios';
  Release.start(process.cwd());
};

exports.IonicTask = IonicTask;

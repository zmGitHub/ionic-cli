var Task = require('./task').Task,
    IonicAppLib = require('ionic-app-lib'),
    Release = IonicAppLib.release;

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.run = function run(ionic, argv, callback) {
  var platform = argv._[1] || 'ios';
  Release.start(process.cwd(), platform, argv.compressImages);
};

exports.IonicTask = IonicTask;

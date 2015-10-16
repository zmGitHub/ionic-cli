var IonicProject = require('./project'),
    Task = require('./task').Task,
    IonicStats = require('./stats').IonicStats,
    LoginTask = require('./login'),
    IonicAppLib = require('ionic-app-lib'),
    Share = IonicAppLib.share,
    Login = IonicAppLib.login,
    Utils = IonicAppLib.utils;

var IonicTask = function() {};

IonicTask.prototype = new Task();

IonicTask.prototype.run = function(ionic, argv) {
  var project;

  if(argv._.length < 2) {
    return ionic.fail('Invalid command', 'share');
  }

  try {
    project = IonicProject.load();
  } catch (ex) {
    ionic.fail(ex.message);
    return
  }

  if (project.get('app_id') == '') {
    return ionic.fail('You must first upload the app to share it');
  }
  
  var email = argv._[1];

  if(email.indexOf('@') < 0) {
    return ionic.fail('Invalid email address', 'share');
  }

  console.log(['Sharing app ', project.get('name'), ' (', project.get('app_id'), ') with ', email, '.'].join('').green);

  IonicStats.t();

  return Login.retrieveLogin()
  .then(function(jar){
    if (!jar) {
      console.log('No previous login existed. Attempting to log in now.');
      return LoginTask.login(argv);
    }
    return jar;
  })
  .then(function(jar) {
    return Share.shareApp(process.cwd(), jar, email);
  })
  .catch(function(ex) {
    // console.log('Error', ex, ex.stack);
    return Utils.fail(ex);
  });
};

exports.IonicTask = IonicTask;

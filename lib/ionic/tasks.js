var TASKS = [
  {
    title: 'info',
    name: 'info',
    summary: 'List information about the users runtime environment',
    module: './ionic/info'
  },
  {
    title: 'help',
    name: 'help',
    summary: 'Provides help for a certain command',
    args: {
      '[command]': 'The command you desire help with'
    },
    module: './ionic/help'
  },
  {
    title: 'start',
    name: 'start',
    summary: 'Starts a new Ionic project in the specified PATH',
    args: {
      '[options]': 'any flags for the command',
      '<PATH>': 'directory for the new project',
      '[template]': 'Template name, ex: tabs, sidemenu, blank\n' +
                    'Codepen url, ex: http://codepen.io/ionic/pen/odqCz\n' +
                    'Defaults to Ionic "tabs" starter template'
    },
    options: {
      '--appname|-a': 'Human readable name for the app (Use quotes around the name)',
      '--id|-i': 'Package name for <widget id> config, ex: com.mycompany.myapp',
      '--no-cordova|-w': 'Create a basic structure without Cordova requirements',
      '--sass|-s': 'Setup the project to use Sass CSS precompiling'
    },
    module: './ionic/start'
  },
  {
    title: 'serve',
    name: 'serve',
    summary: 'Start a local development server for app dev/testing',
    args: {
      '[options]': ''
    },
    options: {
      '--consolelogs|-c': 'Print app console logs to Ionic CLI',
      '--serverlogs|-s': 'Print dev server logs to Ionic CLI',
      '--port|-p': 'Dev server HTTP port (8100 default)',
      '--livereload-port|-r': 'Live Reload port (35729 default)',
      '--nobrowser|-b': 'Disable launching a browser',
      '--nolivereload': 'Do not start live reload',
      '--noproxy|-x': 'Do not add proxies'
    },
    module: './ionic/serve'
  },
  {
    title: 'platform',
    name: 'platform',
    summary: 'Add platform target for building an Ionic app',
    args: {
      '[options]': '',
      '<PLATFORM>': ''
    },
    module: './ionic/cordova'
  },
  {
    title: 'run',
    name: 'run',
    summary: 'Run an Ionic project on a connected device',
    args: {
      '[options]': '',
      '<PLATFORM>': ''
    },
    options: {
      '--livereload|-l': 'Live reload app dev files from the device' + ' (beta)'.yellow,
      '--port|-p': 'Dev server HTTP port (8100 default, livereload req.)',
      '--livereload-port|-r': 'Live Reload port (35729 default, livereload req.)',
      '--consolelogs|-c': 'Print app console logs to Ionic CLI (livereload req.)',
      '--serverlogs|-s': 'Print dev server logs to Ionic CLI (livereload req.)',
      '--debug|--release': '',
      '--device|--emulator|--target=FOO': ''
    },
    module: './ionic/cordova'
  },
  {
    title: 'emulate',
    name: 'emulate',
    summary: 'Emulate an Ionic project on a simulator or emulator',
    args: {
      '[options]': '',
      '<PLATFORM>': ''
    },
    options: {
      '--livereload|-l': 'Live reload app dev files from the device' + ' (beta)'.yellow,
      '--port|-p': 'Dev server HTTP port (8100 default, livereload req.)',
      '--livereload-port|-r': 'Live Reload port (35729 default, livereload req.)',
      '--consolelogs|-c': 'Print app console logs to Ionic CLI (livereload req.)',
      '--serverlogs|-s': 'Print dev server logs to Ionic CLI (livereload req.)',
      '--debug|--release': '',
      '--device|--emulator|--target=FOO': ''
    },
    module: './ionic/cordova'
  },
  {
    title: 'build',
    name: 'build',
    summary: 'Locally build an Ionic project for a given platform',
    args: {
      '[options]': '',
      '<PLATFORM>': ''
    },
    module: './ionic/cordova'
  },
  {
    title: 'plugin add',
    name: 'plugin',
    summary: 'Add a Cordova plugin',
    args: {
      '[options]': '',
      '<SPEC>': 'Can be a plugin ID, a local path, or a git URL.'
    },
    options: {
      '--searchpath <directory>': 'When looking up plugins by ID, look in this directory\n' +
                                  'and subdirectories first for the plugin before\n' +
                                  'looking it up in the registry.'
    },
    module: './ionic/cordova'
  },
  {
    title: 'prepare',
    name: 'prepare',
    module: './ionic/cordova'
  },
  {
    title: 'compile',
    name: 'compile',
    module: './ionic/cordova'
  },
  {
    title: 'resources',
    name: 'resources',
    summary: 'Automatically create icon and splash screen resources' + ' (beta)'.yellow,
    options: {
      '--icon|-i': 'Generate icon resources',
      '--splash|-s': 'Generate splash screen resources'
    },
    module: './ionic/resources/generate'
  },
  {
    title: 'package',
    name: 'package',
    alt: ['pack'],
    summary: 'Package an app using the Ionic Build service' + ' (beta)'.yellow,
    args: {
      '[options]': '',
      '<MODE>': '"debug" or "release"',
      '<PLATFORM>': '"ios" or "android"'
    },
    options: {
      '--android-keystore-file|-k': 'Android keystore file',
      '--android-keystore-alias|-a': 'Android keystore alias',
      '--android-keystore-password|-w': 'Android keystore password',
      '--android-key-password|-r': 'Android key password',
      '--ios-certificate-file|-c': 'iOS certificate file',
      '--ios-certificate-password|-d': 'iOS certificate password',
      '--ios-profile-file|-f': 'iOS profile file',
      '--output|-o': 'Path to save the packaged app',
      '--no-email|-n': 'Do not send a build package email',
      '--clear-signing|-l': 'Clear out all signing data from Ionic server',
      '--email|-e': 'Ionic account email',
      '--password|-p': 'Ionic account password'
    },
    module: './ionic/package'
  },
  {
    title: 'upload',
    name: 'upload',
    summary: 'Upload an app to your Ionic account',
    options: {
      '--email|-e': 'Ionic account email',
      '--password|-p': 'Ionic account password'
    },
    alt: ['up'],
    module: './ionic/upload'
  },
  {
    title: 'lib',
    name: 'lib',
    summary: 'Gets Ionic library version or updates the Ionic library',
    args: {
      '[options]': '',
      '[update]': 'Updates the Ionic Framework in www/lib/ionic'
    },
    options: {
      '--version|-v': 'Specific Ionic version\nOtherwise it defaults to the latest version'
    },
    module: './ionic/lib'
  },
  {
    title: 'setup',
    name: 'setup',
    summary: 'Configure the project with a build tool ' + '(beta)'.yellow,
    args: {
      '[sass]': 'Setup the project to use Sass CSS precompiling'
    },
    module: './ionic/setup'
  },
  {
    title: 'login',
    name: 'login',
    module: './ionic/login'
  },
  {
    title: 'address',
    name: 'address',
    module: './ionic/serve'
  },
  {
    title: 'app',
    name: 'app',
    // summary: 'Deploy a new Ionic app version or list versions',
    // options: {
    //   '--versions|-v': 'List recently uploaded versions of this app',
    //   '--deploy|-d': 'Upload the current working copy and mark it as deployed',
    //   '--note|-n': 'Add a note to a deploy',
    //   '--uuid|-u': 'Mark an already uploaded version as deployed'
    // },
    module: './ionic/app'
   },
   {
    title: 'browser',
    name: 'browser',
    summary: 'Add another broswer for a platform ' + '(beta)'.yellow,
    args: {
      '<command>': '"add remove rm list ls revert"',
      '[browser]': 'The browser you wish to add or remove (Crosswalk)'
    },
    module: './ionic/browser'
  },
  {
    title: 'service add',
    name: 'service',
    summary: 'Add an Ionic service package and install any required plugins',
    args: {
      '[options]': '',
      '<SPEC>': 'Can be a service name or a git url'
    },
    module: './ionic/service'
   },
   {
    title: 'add',
    name: 'add',
    summary: 'Add a bower component to the project',
    args: {
      'component name': ''
    },
    module: './ionic/add'
   },
   {
    title: 'remove',
    name: 'remove',
    summary: 'Remove a bower component from the project',
    args: {
      'component name': ''
    },
    module: './ionic/add',
    alt: ['rm']
   },
   {
    title: 'list',
    name: 'list',
    summary: 'List bower components from the project',
    args: {
      'component name': ''
    },
    module: './ionic/add',
    alt: ['ls']
   }
];

module.exports = TASKS;

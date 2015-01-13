#!/usr/bin/env node
var complete = require('complete')

var platforms = ['ios', 'android'],
    starterTemplates = ['tabs', 'sidemenu', 'blank'];

var crosswalkComplete = function crosswalkComplete(words, prev, cur) {
  if (!words[3]) {
    complete.output(cur, ['crosswalk']);
  }
}

var platformsComplete = function platformsComplete(words, prev, cur) {
  if(!words[3]) {
    complete.output(cur, platforms);
  }
}

var setUp = function setUp(tasks) {
  // console.log('$#$#$#tasks', tasks)
  var taskArray = [],
      taskIndex = 0,
      task = null;

  for (taskIndex in tasks) {
    task = tasks[taskIndex]
    // console.log(task)
    taskArray.push(task.title)
  }

  complete({
    program: 'ionic',
    // Commands
    commands: {
      'add': true,
      'address': true,
      'app': true,
      'browser': {
        'add': crosswalkComplete,
        'list': true,
        'remove': crosswalkComplete,
        'revert': function revert(words, prev, cur) {
          if (!words[3]) {
            complete.output(cur, ['ios', 'android'])
          }
        },
        'rm': crosswalkComplete
      },
      'build': platformsComplete,
      'compile': true,
      'emulate': platformsComplete,
      'help': taskArray,
      'info': true,
      'lib': true,
      'list': true,
      'login': true,
      'package': platformsComplete,
      'platform': {
        'add': platformsComplete,
        'remove': platformsComplete
      },
      'plugin add': true,
      'prepare': platformsComplete,
      'remove': true,
      'resources': true,
      'run': platformsComplete,
      'serve': true,
      'service add': true,
      'setup': true,
      'start': function(words, prev, cur) {
        if(words[2]) {
          complete.output(cur, starterTemplates);
        }
      },
      'upload': true
    },
    // Position-independent options attempted to be
    // matched if `commands` fails to match
    options: {
      '--help': {},
      '-h': {},
      '--version': {},
      '-v': {}
    }
  });
}

module.exports = setUp;

#!/usr/bin/env node

// Inject Service Scripts
// v0.1
// Automatically inject the service bower scripts into the
// index.html page before it is prepared to a platform.
// We look at the ionic.project file to see what services
// are installed, then we go through them and inject
// their main script into the index.html page

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

function readInJsonFile(path) {
  var json = null;
  try {
    var content = fs.readFileSync(path, 'utf8');
    json = JSON.parse(content);
    console.log('read in json: ', json)
  } catch (ex) {
    console.log('We failed - ', ex);
  }
  return json;
}

function getIonicProjectJson() {
  var ionicProjectFile = rootdir + '/ionic.project';
  var ionicProjectJson = null;

  ionicProjectJson = readInJsonFile(ionicProjectFile);

  return ionicProjectJson;
}

function getBowerComponentLocation() {
  var bowerRcFile = rootdir + '/.bowerrc';
  var bowerRcJson = null;
  var bowerDirectory = 'www/lib';

  bowerRcJson = readInJsonFile(bowerRcFile);

  if(bowerRcJson && bowerRcJson.directory) {
    bowerDirectory = bowerRcJson.directory;
  }

  return bowerDirectory;
}

function addInServiceFiles(indexPath, platform) {
  var ionicProjectJson = getIonicProjectJson();
  var bowerDirectory = getBowerComponentLocation();

  //Go through all bower files - if they have `ionic-service` they need to be injected

  var html = fs.readFileSync(indexPath, 'utf8');

  // var headTag = findHeadTag(html);

  var services = ionicProjectJson.services ? ionicProjectJson.services : null;
  console.log('servcies: ', services);
  for(var serviceIndex in services) {
    var service = services[serviceIndex];
    console.log('service: ', service);
  }
    //Scan the page, see if they have included it themselves
    //Go to the bower component - look at bower.json
    //Get the 'main' file - and see if that its in the index.html page
    //NOTE - how do we include the base service stuff?
    var serviceBowerJsonPath = rootdir + '/' + bowerDirectory + '/ionic-service-' + service.name + '/bower.json';
    var serviceBowerJson = readInJsonFile(serviceBowerJsonPath);
    var bowerMainJs = serviceBowerJson.main ? serviceBowerJson.main : null;
    console.log('Our mainjs file for bower is ' , bowerMainJs);
    if(html.indexOf(bowerMainJs) != -1 ){
      //script include exists
      console.log('Script include exists - do nothing');
    } else {
      console.log('Need to inject the service script');
    }

  // console.log('head tag: ', headTag)
}

if (rootdir) {

  // go through each of the platform directories that have been prepared
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  for(var x=0; x<platforms.length; x++) {
    // open up the index.html file at the www root
    try {
      var platform = platforms[x].trim().toLowerCase();
      var indexPath;

      if(platform == 'android') {
        indexPath = path.join('platforms', platform, 'assets', 'www', 'index.html');
      } else {
        indexPath = path.join('platforms', platform, 'www', 'index.html');
      }

      if(fs.existsSync(indexPath)) {
        addInServiceFiles(indexPath, platform);
      }

    } catch(e) {
      process.stdout.write(e);
    }
  }
}

#!/usr/bin/env node

var path = require("path"),
  fs = require("fs"),
  shell = require("shelljs"),
  rootdir = process.argv[2],
  platforms = process.env.CORDOVA_PLATFORMS;

function iosAssets() {
  var iconroot = rootdir + "/assets/ios/icons",
    screenroot = rootdir + "/assets/ios/splash",
    iosroot = rootdir + "/platforms/ios",

    file = rootdir + '/ionic.project',
    projroot = JSON.parse(fs.readFileSync(file, 'utf8')),
    projname = projroot.name;

  try {
    fs.lstatSync(iosroot).isDirectory();
    // incase there are any spaces in the projectname
    var projectname = projname.replace(" ", "\\ ");
    shell.cp('-Rf', iconroot, iosroot + "/" + projname + "/Resources/");
    shell.cp('-Rf', screenroot, iosroot + "/" + projname + "/Resources/");
    console.log("Copied all ios assets.");

  } catch (e) {
    console.log("ios platform does not exist. nothing to do here.");

  };

};

function androidAssets() {
  var iconroot = rootdir + "/assets/android/icon/",
    screenroot = rootdir + "/assets/android/screen/",
    androidroot = rootdir + "/platforms/android";

  try {
    fs.lstatSync(androidroot).isDirectory();
    shell.cp('-Rf', iconroot, androidroot + "/res");
    shell.cp('-Rf', screenroot, androidroot + "/res");
    console.log("Copied all android assets.");

  } catch (e) {
    console.log("android platform does not exist. nothing to do here.");
  }
}

if (platforms == "ios") {
  iosAssets();

} else if (platforms == "android") {
  androidAssets();

} else {
  console.log("Copying assets for iOS and Android");
  iosAssets();
  androidAssets();

}

process.exit(0);

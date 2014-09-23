#!/usr/bin/env node

var path = require("path"),
  fs = require("fs"),
  shell = require("shelljs"),
  rootdir = process.argv[2],
  platforms = process.env.CORDOVA_PLATFORMS;

if (platforms == "ios") {
  var iosroot = rootdir + "/platforms/ios",
    iconroot = rootdir + "/assets/ios/icon",
    screenroot = rootdir + "/assets/ios/screen",
    file = rootdir + '/ionic.project',
    projroot = JSON.parse(fs.readFileSync(file, 'utf8')),
    projname = projroot.name;

  try {
    fs.lstatSync(rootdir + "/assets/ios/").isDirectory();
    console.log("ios platform already exists. skipping.");
  } catch (e) {
    shell.mkdir("-p", rootdir + "/assets/ios/");
    console.log("Making iOS Assests Folder");
    // Lets copy the icons
    console.log("Copying iOS Icon");

    shell.cp('-R', iosroot + "/" + projname + "/Resources/icons", rootdir + "/assets/ios/");

    console.log("Copying iOS Splash");
    shell.cp('-R', iosroot + "/" + projname + "/Resources/splash", rootdir + "/assets/ios/");

  };
} else if (platforms == "android") {
  var androidroot = rootdir + "/platforms/android",
    iconroot = rootdir + "/assets/android/icon",
    screenroot = rootdir + "/assets/android/screen";
  try {
    fs.lstatSync(rootdir + "/assets/android").isDirectory();
    console.log("android platform already exists. skipping.");
  } catch (e) {


    console.log("Making Android Assests Folder");
    shell.mkdir("-p", rootdir + "/assets/android");
    shell.mkdir("-p", iconroot);
    shell.mkdir("-p", screenroot);


    ["", "-hdpi", "-ldpi", "-mdpi", "-xhdpi"].forEach(function(item) {
      shell.cp("-R", androidroot + "/res" + "/drawable" + item, iconroot);
    });
    console.log("Copying Android Icons");



    ["-land-hdpi", "-land-ldpi", "-land-mdpi", "-land-xhdpi", "-port-hdpi", "-port-ldpi", "-port-mdpi", "-port-xhdpi"].forEach(function(item) {
      shell.cp("-R", androidroot + "/res" + "/drawable" + item, screenroot);
    });
    console.log("Copying Android Spalshscreens");
  };
} else {
  //not sure what to do here, Adam, care to chime in...
  console.log("Please specify platform");
};

process.exit(0);

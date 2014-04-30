var fs = require('fs'),
    argv = require('optimist').argv,
    connect = require('connect'),
    open = require('open'),
    tinylr = require('tiny-lr-fork'),
    lr = require('connect-livereload'),
    vfs = require('vinyl-fs'),
    request = require('request'),
    dgram = require('dgram'),
    Q = require('q'),
    IonicProject = require('./project'),
    IonicTask = require('./task').IonicTask;
    IonicStats = require('./stats').IonicStats;

var IonicServeTask = function() {}

IonicServeTask.HELP_LINE = 'Start a local development server for easy app development and testing';

IonicServeTask.prototype = new IonicTask();

IonicServeTask.prototype._printUsage = function() {
  process.stderr.write('\nUsage: ionic serve [http-port] [livereload-port] [options]\n');
  process.stderr.write('\nUse --nobrowser to disable auto browser launch\n');
};

IonicServeTask.prototype.run = function(ionic) {
  var project = IonicProject.load();

  // Grab the name of the app
  this.port = argv._[1] || 8100;
  this.liveReloadPort = argv._[2] || 35729;

  this.launchBrowser = typeof argv['nobrowser'] === 'undefined';
  this.runLivereload = typeof argv['nolivereload'] === 'undefined';


  this._start(ionic);
};

IonicServeTask.prototype._changed = function(path) {
  // Cleanup the path a bit
  var pwd = process.cwd()
  path = path.replace(pwd + '/', '');

  console.log('Changed', path);

  var req = request.post('http://localhost:' + this.liveReloadPort + '/changed', {
    path: '/changed',
    method: 'POST',
    body: JSON.stringify({
      files: [path]
    })
  }, function(err, res, body) {
    if(err) {
      console.error('Unable to update live reload:', err);
    }
  });
};

IonicServeTask.prototype._listenForBroadcast = function(ionic) {
  var self = this;

  var ourPort = this.port;

  var dgram = require('dgram');
  var server = dgram.createSocket('udp4');

  var ip = ionic.getLocalIps();

  server.on('message', function(msg, rinfo) {
    var msgObj = JSON.parse(msg);
    console.log('Device connecting:', msgObj.clientName.info.bold + ' (' + rinfo.address + ', ' + rinfo.port + ')');

    var message = new Buffer('{"addr": ' + ip[0] + ':' + ourPort + '}');
    server.send(message, 0, message.length, rinfo.port, rinfo.address, function(err) {
      if(err) {
        console.error('Unable to send back response to broadcast', err);
      } else {
        console.log('Connected!');
      }
    });
  });

  server.on('listening', function() {
    var address = server.address();
    console.log('Server listening ' + address.address + ':' + address.port);
  });

  server.bind(41234);

  /*
  var dgram = require('dgram');
  var socket = dgram.createSocket('udp4');
  var broadcastAddress = '255.255.255.255';
  var broadcastPort = 41234;
  socket.bind(broadcastPort, '0.0.0.0', function(err) {
    if(err) {
      console.error('Unable to bind for broadcast', err);
    } else {
      socket.setBroadcast(true);
      setInterval(function() {
        var message = new Buffer('ionicview');
        socket.send(message, 0, message.length, broadcastPort, broadcastAddress, function(err) {
          if(err) {
            console.error('Unable to broadcast', err);
          }
          console.log('Sent message');
        });
      }, 3000);
    }
  });
  */

  /*
  var mdns = require('mdns');

  var ad = mdns.createAdvertisement(mdns.tcp('http'), this.port);
  ad.start();

  // watch all http servers
  var browser = mdns.createBrowser(mdns.tcp('http'));
  browser.on('serviceUp', function(service) {
    console.log("service up: ", service);
  });
  browser.on('serviceDown', function(service) {
    console.log("service down: ", service);
  });
  browser.start();

  // discover all available service types
  var all_the_types = mdns.browseThemAll();
  */
  /*
  var server = dgram.createSocket('udp4');
  server.bind();
  server.setBroadcast(true);
  server.setMulticastTTL(128);
  setInterval(function() {
    var msg = new Buffer('ionicview');
    server.send(message, 0, message.length, 41234, "localhost");
  }, 3000);
  */
};

IonicServeTask.prototype._start = function(ionic) {
  var self = this;

  var app = connect();

  if(this.runLivereload) {
    vfs.watch('www/**/*', {
    }, function(f) {
      self._changed(f.path);
    });

    server = tinylr();
    server.listen(this.liveReloadPort, function(err) {
      if(err) {
        ionic.fail('Unable to start server:', err);
      } else {
        console.log('Running live reload server at', ('http://0.0.0.0:' + self.liveReloadPort).info.bold);
        if(self.launchBrowser) {
          open('http://localhost:' + self.port);
        }
      }
    });

    app.use(require('connect-livereload')({
      port: this.liveReloadPort
    }))
  }

  app.use(connect.static('www'))
    .listen(this.port);
  
  console.log('Running dev server at', ('http://0.0.0.0:' + this.port).info.bold);

  this._listenForBroadcast(ionic);
};

module.exports = IonicServeTask;

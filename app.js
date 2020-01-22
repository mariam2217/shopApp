const MongoConnector = require('./server/db-connector');
const Server = require('./server/server');
const nconf = require('nconf');
const path = require('path');
const Redis = require('./server/redis')
const Socket = require('./server/io')
var schedule = require('node-schedule');
 




nconf.file({
  file: path.join(__dirname, 'nconf', 'local.json')
});

(async function run(){
  const db = MongoConnector.getInstance();
  await db.connect();
  const redis = Redis.getInstance();
  await redis.auth();
  const application = require('./express');
  const server = new Server();
  server.application = application;
  const socket = Socket.getInstance(server.server);
  //setInterval(() => {
   // socket.send('name', 10);
  //}, 10000)

  var j = schedule.scheduleJob('0 53 * * * *', function(){
    socket.send('name', 10);
  });
  server.listen(nconf.get('http:port'));
})()


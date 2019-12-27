const MongoConnector = require('./server/db-connector');
const Server = require('./server/server');
const nconf = require('nconf');
const path = require('path');



nconf.file({
  file: path.join(__dirname, 'nconf', 'local.json')
});

(async function run(){
  const db = MongoConnector.getInstance();
  await db.connect();
  const application = require('./express');
  const server = new Server();
  server.application = application;
  server.listen(nconf.get('http:port'));
})()


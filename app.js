const MongoConnector = require('./server/db-connector');

(async function run(){
  const db = MongoConnector.getInstance();
  await db.connect();
})()

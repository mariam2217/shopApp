const { MongoClient } = require('mongodb');
const nconf = require('nconf');

class MongoConnector {
  static getInstance () {
    if (!MongoConnector._instance) {
      /**
       *
       * @type {MongoConnector}
       * @private
       */
      MongoConnector._instance = new MongoConnector();
    }

    return MongoConnector._instance;
  }

  async connect () {
    return new Promise((resolve, reject) => {
      console.log(nconf.get('mongo:uri'));
      const client = new MongoClient (nconf.get('mongo:uri'), {useNewUrlParser: true, useUnifiedTopology: true});
      client.connect((err) => {
        if (err) {
          reject(err);
        }

        this._db = client.db("shop");

        resolve();
      });
    })
  }

  get db () {
    return this._db;
  }
}

module.exports = MongoConnector;




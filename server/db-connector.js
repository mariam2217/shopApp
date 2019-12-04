const { MongoClient } = require('mongodb');

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

  async  connect () {
    new Promise((resolve, reject) => {
      MongoClient.connect("mongodb://admin:pass@172.18.68.185:27001,172.18.68.185:27002/shop?replicaSet=rs&authSource=admin", (err, db) => {
        if (err) {
          reject(err);
        }

        this._db = db;

        resolve();
      });
    })
  }

  get db () {
    return this._db;
  }
}

module.exports = MongoConnector;




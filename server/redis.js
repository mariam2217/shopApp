const redis = require('redis');


class RedisClient {
    constructor () {
            this.client = redis.createClient({
            host: "redis-12934.c91.us-east-1-3.ec2.cloud.redislabs.com",
            port: "12934"
        
        });
    }

  static getInstance () {

    if (!RedisClient._instance) {
        
        RedisClient._instance = new RedisClient();
    }

    return RedisClient._instance;
  }

  async auth () {
      return new Promise ((resolve, reject) => {
          this.client.auth("3HhfQsz664pvdXjoFPaLoCVkl9TJQw7m", (err) => {
              if (err){
                  return reject(err)
              } 
              return resolve();
          })

      })
  }

  get redis () {
    return this._client;
  }

  async set (key, value) {
      return new Promise ((resolve, reject) => {
          this.client.set(key, JSON.stringify(value), "EX", 60*5, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
            }
          )
      })
  }

  async remove (key) {
    return new Promise ((resolve, reject) => {
        this.client.del(key, (err, result) => {
          if (err) {
              return reject(err)
          }
          return resolve(result)
          }
        )
        })
    }

async get (key) {
    return new Promise ((resolve, reject) => {
        this.client.get(key, (err, result) => {
          if (err) {
              return reject(err)
          }
          return resolve(JSON.parse(result))
          }
        )
        })
    }

}




module.exports = RedisClient;




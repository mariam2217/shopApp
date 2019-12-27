const redis = require('redis');

const client = redis.createClient();



class RedisClient {
  static getInstance () {
    if (!RedisClient._instance) {
          
        RedisClient._instance = new RedisClient();
    }

    return RedisClient._instance;
  }

  get redis () {
    return this._redis;
  }
}

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});


module.exports = RedisClient;




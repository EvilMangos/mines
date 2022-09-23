const redis = require('redis');

class Redis {
	constructor() {
		this.client = redis.createClient({
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		});
	}
}

module.exports = Redis;

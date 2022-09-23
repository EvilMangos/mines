const redis = require('redis');

class Redis {
	constructor() {
		this.client = redis.createClient({
			url: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		});
	}
}

module.exports = Redis;

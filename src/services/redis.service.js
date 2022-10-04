const redisService = require('redis');

class RedisService {
	constructor() {
		this.client = redisService.createClient({
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		});
	}
}

module.exports = RedisService;

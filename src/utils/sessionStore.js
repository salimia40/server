
const session = require('express-session');
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const redisClient = redis.createClient({
    url: process.env.REDIS_URL_SESSION
})
const sessionStore = new RedisStore({ client: redisClient });

module.exports = sessionStore
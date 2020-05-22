import { Request, Response, NextFunction } from 'express'
import redis from 'redis';
const { RateLimiterRedis } = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  host: ''
});

export default function rateLimiter(request: Request, response: Response, next: NextFunction) {

}

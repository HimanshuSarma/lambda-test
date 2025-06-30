const Redis = require("ioredis");

const client = new Redis({
  host: 'lambda-test-i0m4qb.serverless.use1.cache.amazonaws.com', // Your ElastiCache Serverless endpoint
  port: 6379,
  tls: {}, // ElastiCache Serverless requires TLS encryption
  // If you have a username/password enabled (recommended for production):
  // username: 'default', // Or your custom user
  // password: process.env.REDIS_PASSWORD,
  // Other options for Lambda:
  connectTimeout: 10000, // Increase if needed for cold starts
  maxRetriesPerRequest: null, // Disable retries on individual commands if you want the initial connection to fail fast
  enableOfflineQueue: true, // Queue commands when disconnected and replay when reconnected
});

client.on('error', (err) => {
  console.error('[ioredis] Unhandled error event:', err);
});

client.on('connect', () => {
  console.error('[ioredis] Connected:');
});

const addValue = async (key, value) => {
  const setResult = await client.set(key, value);
};

const getValue = async (key) => {
  const getResult = await client.get(key);
  return getResult;
};

module.exports = {
  addValue,
  getValue
}
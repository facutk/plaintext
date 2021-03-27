const MAX_JOBS_PER_WORKER = 1;
const PORT = process.env.PORT || 5000
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

module.exports = {
  MAX_JOBS_PER_WORKER,
  PORT,
  REDIS_URL
};

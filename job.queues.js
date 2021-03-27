let Queue = require('bull');
const { REDIS_URL } = require('./config');

const infoQueue = new Queue('info', REDIS_URL);
const workQueue = new Queue('work', REDIS_URL);

module.exports = { 
  infoQueue,
  workQueue
}
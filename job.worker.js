const { v4: uuidv4 } = require('uuid');

const { MAX_JOBS_PER_WORKER } = require('./config');
const { infoQueue, workQueue } = require('./job.queues');
const jobProcess = require('./job.process');

const onJobAdd = async (jobOptions) => {
  const job = await workQueue.add(jobOptions, {
    jobId: uuidv4(),
    removeOnComplete: false,
    attempts: 1,
    removeOnFail: true
  });

  await infoQueue.add({
    workJobId: job.id
  }, {
    jobId: job.id,
    delay: 1000 * 60 * 15, // delete job after 15 minutes
    removeOnComplete: true
  });

  return job.id;
};

const onJobPoll = async (id) => {
  const job = await workQueue.getJob(id);

  if (job === null) {
    return null;
  }

  const state = await job.getState();
  const progress = job._progress;
  const reason = job.failedReason;

  return { id, state, progress, reason };
}

const onJobGet = async (id) => {
  const job = await workQueue.getJob(id);

  if (job === null) {
    return null;
  }

  return job.returnvalue;
}


infoQueue.process(async (job) => {
  const workJob = await workQueue.getJob(job.data.workJobId);
  if (!workJob) {
    return;
  }
  workJob.remove();
});

infoQueue.on('global:completed', async () => {
  const { waiting, delayed } = await infoQueue.getJobCounts();
  const pending = waiting + delayed;

  if (pending === 0) {
    console.log('No more pending jobs, purging queues');
    await workQueue.obliterate({ force: true });
    await infoQueue.obliterate({ force: true });
  }
})

workQueue.process(MAX_JOBS_PER_WORKER, jobProcess);

module.exports = {
  onJobAdd,
  onJobPoll,
  onJobGet
};

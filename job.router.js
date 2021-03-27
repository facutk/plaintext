const express = require('express');
const jobRouter = express.Router();
const { setQueues, BullAdapter } = require('bull-board')
const { router } = require('bull-board')
const { infoQueue, workQueue } = require('./job.queues');
const { onJobAdd, onJobGet, onJobPoll } = require('./job.worker');

setQueues([
  new BullAdapter(workQueue),
  new BullAdapter(infoQueue)
]);

jobRouter.use('/queues', router);

jobRouter.post('/', async (req, res) => {
  const { body } = req;
  const { url, delay, onOpen } = body;

  const jobId = await onJobAdd({
    url,
    delay,
    onOpen
  });

  res.send(jobId);
});

jobRouter.get('/:id/poll', async (req, res) => {
  const { id } = req.params;

  const status = await onJobPoll(id);

  if (status === null) {
    return res.status(404).end();
  }

  return res.json(status);
});

jobRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const returnvalue = await onJobGet(id);

  if (returnvalue === null) {
    return res.status(404).end();
  }

  return res.send(returnvalue);
});

module.exports = jobRouter;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { Activity } = require('./models');
const options = require('./options');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(options.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Eartrainr API says hello!');
});

app.post('/activity', async (req, res, next) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

app.get('/activity', async (req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

app.get('/activity/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

app.put('/activity/:id', (req, res) => {
  // TODO update activity object with specific id
});

app.delete('/activity/:id', (req, res) => {
  // TODO delete activity object with specific id
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(500).send({
    error: err.message,
  });
});

app.listen(options.port, () => {
  console.log(`Eartrainr backend listening on port ${options.port}`);
});

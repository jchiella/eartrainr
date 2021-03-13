const express = require('express');
const mongoose = require('mongoose');

const { Activity } = require('./models');
const options = require('./options');

const app = express();
app.use(express.json());

mongoose.connect(options.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Eartrainr API says hello!');
});

app.post('/activity', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
});

app.get('/activity/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  res.json(activity);
});

app.put('/activity/:id', (req, res) => {
  // TODO update activity object with specific id
});

app.delete('/activity/:id', (req, res) => {
  // TODO delete activity object with specific id
});

app.listen(options.port, () => {
  console.log(`Eartrainr backend listening on port ${options.port}`);
});

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['chord', 'interval', 'rhythm'],
      required: true,
    },
    groups: {
      type: [
        {
          name: { type: String, required: true },
          values: [String],
          length: Number,
        },
      ],
      required: true,
    },
    count: { type: Number, required: true },
    cumulative: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = {
  Activity,
};

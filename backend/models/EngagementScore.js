const mongoose = require("mongoose");

const engagementScoreSchema = new mongoose.Schema(
  {
    content_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true
    },

    average_completion_rate: {
      type: Number,
      required: true,
      default: 0
    },

    average_watch_duration: {
      type: Number,
      required: true,
      default: 0
    },

    average_pause_frequency: {
      type: Number,
      required: true,
      default: 0
    },

    engagement_score: {
      type: Number,
      required: true,
      default: 0
    },

    total_views: {
      type: Number,
      required: true,
      default: 0
    },

    total_completed_views: {
      type: Number,
      required: true,
      default: 0
    },

    calculated_on: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "EngagementScore",
  engagementScoreSchema
);
const mongoose = require("mongoose");

const viewerSessionSchema = new mongoose.Schema(
  {
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },

    watchDuration: {
      type: Number,
      required: true,
    },

    completionPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    pauseCount: {
      type: Number,
      default: 0,
    },

    rewindCount: {
      type: Number,
      default: 0,
    },

    device: {
      type: String,
      enum: ["Mobile", "Laptop", "Tablet", "TV"],
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    subscriptionType: {
      type: String,
      enum: ["Free", "Basic", "Premium"],
      required: true,
    },

    watchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ViewerSession", viewerSessionSchema);
const mongoose = require("mongoose");

const viewerSessionSchema = new mongoose.Schema(
{
    content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        required: true
    },

    viewer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    watch_date: {
        type: Date,
        required: true
    },

    completion_percentage: {
        type: Number,
        required: true
    },

    watch_duration_sec: {
        type: Number,
        required: true
    },

    pause_count: Number,

    rewind_count: Number,

    fast_forward_count: Number,

    device_type: {
        type: String,
        enum: ["Mobile", "Laptop", "Smart TV", "Tablet"]
    },

    subscription_tier: {
        type: String,
        enum: ["Basic", "Standard", "Premium"]
    },

    region: String,

    session_status: {
        type: String,
        enum: ["Completed", "Incomplete"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "ViewerSession",
    viewerSessionSchema
);
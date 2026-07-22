const mongoose = require("mongoose");

const engagementSchema = new mongoose.Schema({

    content_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Content"
    },

    average_completion_rate:Number,

    average_watch_duration:Number,

    average_pause_frequency:Number,

    engagement_score:Number,

    total_views:Number,

    total_completed_views:Number,

    calculated_on:Date

},{
    timestamps:true
});

module.exports = mongoose.model(
    "EngagementScore",
    engagementSchema
);
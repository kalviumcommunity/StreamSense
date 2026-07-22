const mongoose = require("mongoose");

const retentionSchema = new mongoose.Schema({

    content_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Content"
    },

    analysis_period:String,

    retention_rate:Number,

    churn_rate:Number,

    returning_viewers:Number,

    new_viewers:Number,

    renewed_viewers:Number,

    renewed_subscribers:Number,

    churned_subscribers:Number,

    calculated_on:Date

},{
    timestamps:true
});

module.exports = mongoose.model(
    "RetentionAnalytics",
    retentionSchema
);
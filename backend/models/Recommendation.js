const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({

    content_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Content"
    },

    recommendation_type:String,

    confidence_score:Number,

    priority:String,

    reason:String,

    generated_on:Date

},{
    timestamps:true
});

module.exports = mongoose.model(
    "Recommendation",
    recommendationSchema
);
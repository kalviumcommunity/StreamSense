const mongoose = require("mongoose");

const retentionAnalyticsSchema = new mongoose.Schema(
{
    content_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Content",
        required:true
    },

    day_1_retention:{
        type:Number,
        default:0
    },

    day_7_retention:{
        type:Number,
        default:0
    },

    day_30_retention:{
        type:Number,
        default:0
    },

    average_return_days:{
        type:Number,
        default:0
    },

    churn_rate:{
        type:Number,
        default:0
    },

    repeat_viewers:{
        type:Number,
        default:0
    },

    calculated_on:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});

module.exports=mongoose.model(
    "RetentionAnalytics",
    retentionAnalyticsSchema
);
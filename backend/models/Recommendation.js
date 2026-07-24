const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
{
    content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        required: true
    },

    recommendation_type: {
        type: String,
        enum: [
            "Trending",
            "Popular",
            "Similar Genre",
            "High Engagement",
            "Top Rated"
        ],
        required: true
    },

    score: {
        type: Number,
        required: true
    },

    reason: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Recommendation",
    recommendationSchema
);
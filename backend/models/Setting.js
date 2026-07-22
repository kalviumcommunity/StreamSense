const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
{
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    theme: {
        type: String,
        enum: ["Light", "Dark"],
        default: "Light"
    },

    language: {
        type: String,
        default: "English"
    },

    notifications_enabled: {
        type: Boolean,
        default: true
    },

    timezone: {
        type: String,
        default: "Asia/Kolkata"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Setting",
    settingSchema
);
const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:String,

    genre:String,

    language:String,

    contentType:{
        type:String,
        enum:["Movie","Series"]
    },

    releaseDate:Date,

    durationMin:Number,

    imdbRating:Number,

    thumbnailUrl:String,

    status:{
        type:String,
        default:"Active"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Content",contentSchema);
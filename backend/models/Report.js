const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

    report_name:String,

    report_type:String,

    generated_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    start_date:Date,

    end_date:Date,

    export_format:String,

    file_path:String,

    generated_on:Date

},{
    timestamps:true
});

module.exports = mongoose.model(
    "Report",
    reportSchema
);
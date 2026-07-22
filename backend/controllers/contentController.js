const Content=require("../models/Content");

exports.createContent=async(req,res)=>{

try{

const content=await Content.create(req.body);

res.status(201).json(content);

}catch(error){

res.status(500).json({

message:error.message

});

}

};

exports.getContent=async(req,res)=>{

try{

const content=await Content.find();

res.json(content);

}catch(error){

res.status(500).json({

message:error.message

});

}

};
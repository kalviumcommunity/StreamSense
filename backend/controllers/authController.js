const bcrypt=require("bcrypt");
const generateJWT = require("../utils/generateJWT");

const User=require("../models/User");

exports.register=async(req,res)=>{

try{

const{name,email,password,role}=req.body;

const exists=await User.findOne({email});

if(exists){

return res.status(400).json({
message:"User already exists"
});

}

const hashedPassword=await bcrypt.hash(password,10);

const user=await User.create({

name,

email,

password:hashedPassword,

role

});

res.status(201).json({

message:"User Registered",

user

});

}catch(error){

res.status(500).json({

message:error.message

});

}

};

exports.login=async(req,res)=>{

try{

const{email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(404).json({

message:"User not found"

});

}

const isMatch=await bcrypt.compare(password,user.password);

if(!isMatch){

return res.status(401).json({

message:"Invalid Password"

});

}

const token = generateJWT(user);

res.json({

message:"Login Success",

token,

user

});

}catch(error){

res.status(500).json({

message:error.message

});

}

};
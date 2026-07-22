const express=require("express");

const router=express.Router();

const{

createContent,

getContent

}=require("../controllers/contentController");

router.post("/",createContent);

router.get("/",getContent);

module.exports=router;
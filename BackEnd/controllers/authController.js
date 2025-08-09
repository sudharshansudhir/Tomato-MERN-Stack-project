const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User = require("../models/User");
// const secret_key=require("../.env")
// const router  = require("../routes/authRoutes");
const register=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            username:username,
            email,
            password:hashedpassword,
        })
        console.log(newUser)
        res.json({success:true,message:"Success raa"})
    }
    catch(err){
        console.log(err)
    }
    
}
const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username})
        if(!user){
            return res.json({success:false,message:"Register first to Login"})
        }
        const pwd=await bcrypt.compare(password,user.password)
        if(pwd){
                const token = jwt.sign({ userId: user._id }, process.env.secret_key);
                

                return res.json({success:true,token})            
        }
        else{
            return res.json({success:false,message:"Invalid password"})
        }
        //res.send("Success raa")
    }
    catch(err){
        console.log(err)
    }
    
}

 module.exports={register,loginUser};
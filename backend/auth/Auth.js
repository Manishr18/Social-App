const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const express=require('express')
const router=express.Router();
const user=require('../model/User')
require('dotenv').config();
router.post('/register',async(req,res)=>{
   
    try {
         const{name,email,password}=req.body;
        const match=await user.findOne({email})
        if(match){
            res.status(403).json({message:"user email exist"});
            }
        const hashedpassword=await bcrypt.hash(password,10)
        const newUser=new user({name,email,password:hashedpassword})
        await newUser.save();
        res.status(200).json({message:"registered "})
    } catch (err) {
        res.status(403).json({error:err.message })
    }
})
router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existuser=await user.findOne({email});
        if(!existuser){
            res.status(403).json({message:"Invalid username or password"});
        }
        const match=await bcrypt.compare(password,existuser.password);
        if(!match){
            res.status(403).json({message:"Invalid username or password"});
        }
        const token=jwt.sign({id:existuser._id},process.env.JWT_SECRET,{
            expiresIn:'1h'
        })
        res.status(200).json({message:"Login successful",token,name:existuser.name});
    } catch (err) {
        res.status(404).json({error:err.message})
    }
})
module.exports=router
const express=require('express');
const router=express.Router();
const User=require('../model/User');
const Post=require('../model/Post');
const auth = require('../middleware/Auth');
router.get('/:id',auth,async (req,res)=>{
    try {
        const user=await User.findById(req.params.id).select('-password');
        if(!user)res.status(404).json({message:"user not found"});
        const post=await Post.find({user:user._id}).sort({createdAt:-1});
        res.json({user,post});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
    

})
module.exports=router
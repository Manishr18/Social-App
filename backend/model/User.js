const mongo=require('mongoose')
const userschema=new mongo.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});

module.exports=mongo.model("User",userschema)
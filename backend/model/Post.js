const mongo=require('mongoose')
const User = require('./User')

const postschema=mongo.Schema({
    user:{type: mongo.Schema.Types.ObjectId,ref:'User'},
    text:{type:String,required:true},
    image:{type:String},
    likes:[{type:mongo.Schema.Types.ObjectId,ref:'User'}],
    comments:[
        {
            user:{type:mongo.Schema.Types.ObjectId,ref:'User'},
            text:{type:String},
            createdAt:{type:Date,default:Date.now}
        }
    ],
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongo.model('Post',postschema);
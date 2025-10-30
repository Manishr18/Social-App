const jwt=require('jsonwebtoken');


function auth(req,res,next){
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({message:"token not valid"});
    }
    try {
        const verified=jwt.verify(token.replace('Bearer ',""),process.env.JWT_SECRET);
        req.user=verified;
        next();
    } catch (error) {
        res.status(401).json({error:error.message});
    }
    
    
}
module.exports=auth
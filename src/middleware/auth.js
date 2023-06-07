const jwt = require("jsonwebtoken")
const{ sign, verify } = require('jsonwebtoken')

const createTokens = (user)=>{
    const accessToken = sign({ userId: user.user_id},process.env.JWT_SECRET  ,{ expiresIn: '24h'})
    return accessToken;
}

const validateToken = (req, res, next)=>{
    try{
        
        const accessToken = req.headers.authorization.split(' ')[1];   
        
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        const userId = decodedToken.userId; 

        req.auth = {
            userId: userId
        };
        console.log("auth.js: " + req.auth.userId + " sent a request")
        
        next();
    } catch (err){
        return res.status(401).json({error: err});
    }
}

module.exports={ createTokens, validateToken}
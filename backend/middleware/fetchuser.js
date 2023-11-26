const JWT_SECRET = "RishabhSeKuchNahiHoga";
const jwt = require('jsonwebtoken');

const fetchuser = async(req,res,next) =>{
    // get the user from the jwt token and add id to req obj
    const token = req.header('Authorization');
    if (!token){
        res.status(401).json({error:"Please Authenticate using valid token"})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Please Authenticate using valid token"})
    }
}

module.exports = fetchuser;
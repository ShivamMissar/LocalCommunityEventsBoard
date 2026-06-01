const jwt = require('jsonwebtoken');


function authenticationToken(req,res,next)
{
    // this grabs the actual token itself
    const token = req.headers['authorization']?.split(' ')[1]; 

    if(!token)
    {
        return res.status(401).json({message: 'Invalid request'}); 
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err)
        {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticationToken;
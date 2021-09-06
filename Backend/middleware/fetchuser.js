const jwt = require('jsonwebtoken')
const JWT_SECRET = 'vik@skum@RNirmalL';

const fetchuser = (req, res, next)=>{
        // Get the user from the jwt token and add id to req
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({error: 'please login'})
        }

        try {
            const data = jwt.verify(token, JWT_SECRET)
            req.user = data.user;
            next()   
        } catch (error) {
            res.status(401).send({error: 'please authenticate using valid cred'})
        }
        
}

module.exports = fetchuser;
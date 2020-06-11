const jwt = require('jsonwebtoken');
const jwtSecret= 'thistextmustbeveryverysecret'; 
module.exports = function(req, res, next){
    
    // Get Token From Header
    const token = req.header('x-auth-token');
    // Check If Not Token 
    if(!token){
        return res.status(401).json({ msg: 'NO Token, Authorization Denied !'});
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
       
        req.user = decoded.user;
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token is Not Valid'})
    }
};
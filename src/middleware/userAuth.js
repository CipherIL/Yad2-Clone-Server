const jwt = require('jsonwebtoken');
const User = require('../models/user');
const LoginCredentials = require('../models/loginCredentials')

const userAuth = async (req,res,next) => {
    try{ 
        //Check if the client holds a token
        if(!req.cookies.AuthToken) throw new Error();

        //Check if the token is in the database
        const token = await LoginCredentials.findOne({token: req.cookies.AuthToken})
        if(!token) throw new Error();

        //Check if the token can be decoded with the correct secret
        const decoded = jwt.verify(req.cookies.AuthToken, process.env.SECRET);
        if(!decoded) throw new Error();

        //Check if the token holds a valid user
        const user = await User.findById(decoded.data);
        if(!user) throw new Error();

        //Put user in the request and continue
        req.user = user;
        next();
        
    } catch (err) {
        return res.status(401).send("Not Authorized");
    }
}

module.exports = userAuth;
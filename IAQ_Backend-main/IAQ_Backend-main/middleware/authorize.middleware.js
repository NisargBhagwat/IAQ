const { verify } = require("jsonwebtoken");
const HttpException = require("../utils/HttpException");
const HttpStats = require("../utils/HttpStatus");
const User = require("../model/user.model");

const authorize = (req, res, next) => {
    try{
        const authHeader = req.get('Authorization');
    
        if(!authHeader)
            throw new HttpException("Not Authorized", HttpStats.UNAUTHORIZED)

        const token = authHeader.split(' ')[1];

        verify(token, process.env.JWT, (err, decoded) => {

            User.findById(decoded.userId)
            .then(user => {
                req.user = user;
                return next();
            })
            .catch(err => {
                return next(err);
            })
        })
    }
    catch(err){
        next(err);
    }

}

module.exports = authorize;
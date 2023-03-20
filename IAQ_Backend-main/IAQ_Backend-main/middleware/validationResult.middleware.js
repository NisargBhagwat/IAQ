const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException');

const validationResults = (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            const error = errors.errors.map(error => error.msg);
            throw new HttpException(error.join(", "), 400, true);
        }
        next();
    }
    catch(err) {
        next(err);
    }
}

module.exports = validationResults;
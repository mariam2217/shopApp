const mongoConnerctor = require('../db-connector');
const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

class JsonVerifier {
    constructor(){
        const db = mongoConnerctor.getInstance();
        this.collection = db.db.collection('users');
    }
    async handler(req, res, next) {
        try { 
            if (!req.headers.authorization) {
                return next(new Error('Forbidden'));
            }
            const decoded = jwt.verify(req.headers.authorization.replace('Bearer ', ''), 'password');

            if(!ObjectId.isValid(decoded.id)) {
                return next(new Error('id is invalid'));

            }

            const user = await this.collection.findOne({_id: ObjectId(decoded.id)});
            if(!user) {
                return next(new Error('User does not exist'));
            }
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    }
    

}

module.exports  = JsonVerifier;
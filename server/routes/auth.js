const express = require('express');
const Validator = require('fastest-validator');
const mongoConnerctor = require('../db-connector');
const jwt = require('jsonwebtoken');

class Auth {
    constructor() {
        const db = mongoConnerctor.getInstance();
        this._router = express.Router();
        this.validator = new Validator();
        this.collection = db.db.collection('users');
        this.initHandler();

    }

    initHandler() {
        this._router.post('/signup', async (...args) => this.signup (...args));
        this._router.post('/signin', async (...args) => this.signin (...args));
    }

    async signup(req, res, next) {
        try {
            const data = req.body;
            const validationResult = this.validator.validate(
                data,
                {
                    login: {
                        type: "email",
                    },

                    fullName: {
                        type: 'string',
                        empty: false,
                        min: 5,
                        alphanum: true,
                    },
    
                    password: {
                        type: 'string',
                        empty: false,
                        min: 5,
                    }
                }
            );
    
            if (validationResult !== true) {
                return res.json(validationResult);
            }

            const user = await this.collection.findOne({login: data.login});

            if (user) {
                return res.json({error: "User exists!"})
            }

            let answer = await this.collection.insertOne(data);
            console.log(answer.stringify);
            res.json({result: true});

        } catch (error) {
            res.end(error.message);
        }

        

    }

    async signin(req, res, next) {
        const user = await this.collection.findOne({login: req.body.login});
        if (!user) {
            return res.json({error: "User not found!"})
        }

        if (user.password !== req.body.password) {
            return res.json({error: "Password is wrong!"})
        }

    

    const token = jwt.sign({id: user._id}, 'password', {expiresIn: 60*60});
    res.json({token});
            
    }
    get router() {
        return this._router;
    }
    
}

module.exports = Auth;
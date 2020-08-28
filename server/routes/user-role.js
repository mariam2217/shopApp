const express = require('express');
const Validator = require('fastest-validator');
const mongoConnerctor = require('../db-connector');
const {ObjectId} = require('mongodb');

class UserRole {
    constructor() {
        const db = mongoConnerctor.getInstance();
        this._router = express.Router();
        this.validator = new Validator();
        this.collection = db.db.collection('userRoles');
        this.initHandler();

    }

    initHandler() {
        this._router.post('/', async (...args) => this.create(...args));
        this._router.get('/:id', async (...args) => this.get(...args));
        this._router.delete('/:id', async (...args) => this.delete(...args))
        this._router.get('/', async (...args) => this.list(...args));
    }
    
    async create(req, res) {
        try {
            const item = req.body;
            const validationResult = this.validator.validate(
                item,
                {
                    user_id: {
                        type: 'string',
                        empty: false,                        
                    },

                    role_id: {
                        type: 'string',
                        empty: false,
                    }
               
                }
            );
    
            if (validationResult !== true) {
                return res.json(validationResult);
            }

            item.created_at = Date.now();
            item.updated_at = Date.now();


            const data = await this.collection.insertOne(item);
            //let answer = answer.ops[0];
            res.json({result: data.ops[0]});
            
            


        } catch (error) {
            res.end(error.message);
        }
    }

    async update(req, res, next) {
        const id = req.params.id;
        if(!ObjectId.isValid(id)) {
           return next(new Error('ID is not valid'));
        }
            const item = req.body;
            const validationResult = this.validator.validate(
                item,
                {
                    role_id: {
                        type: 'string',
                        empty: false,                        
                    },

                    action_id: {
                        type: 'string',
                        empty: false,
                    }            
                }
            );

            if (validationResult !== true) {
                return res.json(validationResult);
            };

            let answer = await this.collection.updateOne({_id: ObjectId(id)}, {$set: item});

            res.json({result: "success"});
    }

    async get(req, res, next) {
        const userRoleId  = req.params.id;
        if(!ObjectId.isValid(userRoleId)) {
            return next(new Error('ID is not valid'));
         }
        const userRole = await this.collection.findOne({_id: ObjectId(userRoleId)});
        if (!userRole) {
            return res.json({error: "Relation not found!"})
        }
        res.json({userRole});
    }

    async delete(req, res, next) {
        const roleAuserRoleIdctionId  = req.params.id;
        if(!ObjectId.isValid(userRoleId)) {
            return next(new Error('ID is not valid'));
         }
        const userRole = await this.collection.deleteOne({_id: ObjectId(userRoleId)});
        if (!userRole) {
            return res.json({error: "Relation not found!"})
        }
        res.json({result: "Deleted!"});
    }

    async list(req, res) {
        const {limit, skip} = req.query;
        const parameter = req.query;
            const validationResult = this.validator.validate(
                parameter,
                {
                    limit: {
                        type: 'number',
                        positive: true,
                        convert: true,
                    },

                    skip: {
                        type: 'number',
                        negative: false,
                        convert: true,
                        
                    }
                });

                if (validationResult !== true) {
                    return res.json(validationResult);
                };
        
        const roleActionArr = await this.collection.find({}).limit(parseInt(limit)).skip(parseInt(skip)).toArray();
        res.json({roleAction: roleActionArr});


    }
    get router() {
        return this._router;
    }
    
}

module.exports = UserRole;
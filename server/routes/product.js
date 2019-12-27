const express = require('express');
const Validator = require('fastest-validator');
const mongoConnerctor = require('../db-connector');
const {ObjectId} = require('mongodb');

class Product {
    constructor() {
        const db = mongoConnerctor.getInstance();
        this._router = express.Router();
        this.validator = new Validator();
        this.collection = db.db.collection('shopProducts');
        this.initHandler();

    }

    initHandler() {
        this._router.post('/', async (...args) => this.create(...args));
        this._router.put('/:id', async (...args) => this.update(...args));
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
                    name: {
                        type: 'string',
                        empty: false,
                        min: 5
                        
                    },
    
                    description: {
                        type: 'string',
                        empty: false,
                        min: 10,
                    },

                    price: {
                        type: "number",
                        empty: false,
                        positive: true,
                        notEqual: 0,

                    },

                
                }
            );
    
            if (validationResult !== true) {
                return res.json(validationResult);
            }


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
                    name: {
                        optional: true,
                        type: 'string',
                        empty: false,
                        min: 5
                        
                    },
    
                    description: {
                        optional: true,
                        type: 'string',
                        empty: false,
                        min: 10,
                    },

                    price: {
                        optional: true,
                        type: "number",
                        empty: false,
                        positive: true,
                        notEqual: 0,

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
        const productId  = req.params.id;
        if(!ObjectId.isValid(productId)) {
            return next(new Error('ID is not valid'));
         }
        const product = await this.collection.findOne({_id: ObjectId(productId)});
        if (!product) {
            return res.json({error: "Product not found!"})
        }
        res.json({product});
    }

    async delete(req, res, next) {
        const productId  = req.params.id;
        if(!ObjectId.isValid(productId)) {
            return next(new Error('ID is not valid'));
         }
        const product = await this.collection.deleteOne({_id: ObjectId(productId)});
        if (!product) {
            return res.json({error: "Product not found!"})
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
        
        const productArr = await this.collection.find({}).limit(parseInt(limit)).skip(parseInt(skip)).toArray();
        res.json({products: productArr});


    }
    get router() {
        return this._router;
    }
    
}

module.exports = Product;
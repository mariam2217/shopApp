const express = require('express');
const Validator = require('fastest-validator');
const mongoConnerctor = require('../db-connector');
const {ObjectId} = require('mongodb');

class Purchase {
    constructor() {
        const db = mongoConnerctor.getInstance();
        this._router = express.Router();
        this.validator = new Validator();
        this.collection = db.db.collection('purchases');
        this.initHandler();

    }

    initHandler() {
        this._router.post('/', async (...args) => this.create(...args));
        this._router.get('/:id', async (...args) => this.get(...args));
    }
    
    async create(req, res) {
        try {
            const item = req.body;
            const validationResult = this.validator.validate(
                item,
                {
                    
                    currentPurchaseCount: {
                        type: "number",
                        empty: false,
                        positive: true,
                        notEqual: 0,
                        integer: false,

                    },
                }
            );
    
            if (validationResult !== true) {
                return res.json(validationResult);
            }

            item.created_at = Date.now();
           
            const id = req.params.id;
            if(!ObjectId.isValid(id)) {
            return next(new Error('ID is not valid'));
            }


            const data = await this.collection.insertOne({
                user_id: req.user._id,
                product_id: req.product._id,
                price: req.product.price,
                created_at: req.body.created_at,
                currentPurchaseCount: req.body.count,
            });
            
            res.json({result: data.ops[0]});
            
            


        } catch (error) {
            res.end(error.message);
        }
    }

    async get(req, res, next) {
        const purchasetId  = req.params.id;
        if(!ObjectId.isValid(purchasetId)) {
            return next(new Error('ID is not valid'));
         }
        const purchase = await this.collection.findOne({_id: ObjectId(purchasetId)});
        if (!purchase) {
            return res.json({error: "Purchase not found!"})
        }
        res.json({purchase});
    }

    get router() {
        return this._router;
    }
    
}

module.exports = Purchase;
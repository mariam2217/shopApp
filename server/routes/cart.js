const express = require('express');
const Validator = require('fastest-validator');
const mongoConnerctor = require('../db-connector');
const {ObjectId} = require('mongodb');



class Cart {
    constructor() {
        const db = mongoConnerctor.getInstance();
        this._router = express.Router();
        this.validator = new Validator();
        this.collection = db.db.collection('cart');
        this.initHandler();

    }


    initHandler() {
        this._router.post('/add/:id', async (...args) => this.add(...args));
        this._router.get('/:id', async (...args) => this.get(...args));
        this._router.delete('/:id', async (...args) => this.delete(...args));

    }

    async add(req, res, next) {
        const id = req.params.id;
        if(!ObjectId.isValid(id)) {
        return next(new Error('ID is not valid'));
        }
        const data = await this.collection.findOneAndUpdate(
            {user_id: req.user._id}, 
            {$addToSet: {product: ObjectId(id)}},
            {returnNewDocument: true, upsert: true},
            );
                //let answer = answer.ops[0];
                res.json({result: data.value});
    }

    async get(req, res, next) {
        const cartId  = req.params.id;
        
        if(!ObjectId.isValid(cartId)) {
            return next(new Error('ID is not valid'));
        }

        const product = await this.collection.findOne({user_id: ObjectId(cartId)});
        
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

        const data = await this.collection.findOneAndUpdate(
            {user_id: req.user._id}, 
            {$pull: {product: ObjectId(productId)}},
            {returnNewDocument: true},
            );

        if (!data.value) {
            return res.json({error: "Product not found!"})
        }
         res.json(data.value);




    }

        

   

get router() {
    return this._router;
}
}

module.exports = Cart;
const express = require('express');
const mongoConnerctor = require('../db-connector');
const multer = require('multer');
const path = require('path');




class ImageUpload {
    constructor() {
        this._router = express.Router();
        this.upload = multer({dest: path.join(__dirname, '..', '..', 'public', 'images')});
        this.initHandler();

    }


    initHandler() {
        this._router.post('/upload', this.upload.single('photo'), (req, res) => {
            if(req.file) {
                res.json(req.file);
            }
            else throw 'error';
        });

    }

    get router() {
        return this._router;
    }
}
    module.exports = ImageUpload;
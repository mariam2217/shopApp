const express = require('express');
const mongoConnerctor = require('../db-connector');
const AccessControl = require('accesscontrol');

class Roles {
    constructor() {
        const db = mongoConnerctor.getInstance();
        this._router = express.Router();
        this.collection = db.db.collection('roles');
    }

    access = new AccessControl(grants);

    grants = {
        admin: {

            categories: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any' : ['*'],
                'delete:any' : ['*']
            },

            products: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any' : ['*'],
                'delete:any' : ['*']
            },

            purchases: {
                'read:any': ['*'],
            },

            user: {
                'read:any': ['*'],
                'update:any' : ['*'],
                'delete:any' : ['*']
            }

        },

        user: {

            products: {
                'read:any': ['*'],
            },

            purchases: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any' : ['*'],
                'delete:any' : ['*']
            },

            cart: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any' : ['*'],
                'delete:any' : ['*']
            },

            signUp: {
                'create:own': ['*'],
                'update:own' : ['*'],
                'delete:own' : ['*']
            },

            signIn: {
                'create:own': ['*'],
                'update:own' : ['*'],
                'delete:own' : ['*']
            }

        }
    }
  
}

module.exports = Roles;
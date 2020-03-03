const mongoConnerctor = require('../db-connector');
const {ObjectId} = require('mongodb');

const action = require('../routes/action.js');
const roleAction = require('../routes/role-action.js');
const userRole = require('../routes/user-role.js');


class AccsessControl {
    constructor(){
        const db = mongoConnerctor.getInstance();
        this.actionCollection = db.db.collection('actions');
        this.roleActionCollection = db.db.collection('roleActions');
        this.userRoleCollection = db.db.collection('userRoles');
        
    }

    async handler (req, res, next) {

        const action = await this.actionCollection.findOne({url: req.url, method: req.method});
        if (!action) {
            return res.json({error: "Action not found"})
        } 

        const roleActions = await this.roleActionCollection.find({action_id: action._id}).toArray();
        if (roleActions.length === 0) {
            return res.json({error: "Role is not found!"})
        } 

        const user = await this.userRoleCollection
        .findOne({user_id: req.user._id, role_id: {$in: roleActions.map(({role_id}) => role_id)}});
        if (!user) {
            return res.json({error: "You don't have access!"})
        } 
         next();
    }
}

module.exports = AccsessControl;
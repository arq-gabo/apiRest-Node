const buildParams = require('./helpers').paramsBuilder;

const validParams = ['_place', 'reaction', 'observation'];

const Visit = require('../models/Visit');
const User = require('../models/User');

function find(req, res, next){
    Visit.findById(req.params.visit_id).then(visit=>{
        req.mainObj = visit;
        req.favorite = visit;
        next();
    }).catch(next);
}

function index(req, res){
    User.findOne({'_id': req.user.id}).then(user=>{
        user.favorites.then(places=>{
            res.json(places);
        })
        }).catch(err=>{
            console.log(err);
            res.json(err);
    })
}


function create(req, res){
    let params = buildParams(validParams, req.body);
    params['_user'] = req.user.id;

    Visit.create(params)
        .then(visit=>{
            res.json(visit);
        }).catch(error=>{
            res.status(422).json(error);
        })
}

function destroy(req, res){
    req.visit.remove().then(doc=>{
        res.json({});
    }).catch(err=>{
        res.status(500).json({error});
    })
}

module.exports = { find, create, destroy, index };
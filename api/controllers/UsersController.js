const User = require('../models/User');

const paramsBuilder = require('./helpers').paramsBuilder;

const validParams = ['email', 'name', 'password'];

function create(req, res, next) {
    let params = paramsBuilder(validParams, req.body);
    User.create(params)
        .then(user=>{
            req.user = user;
            next();
            //res.json(user);
        }).catch(err=>{
            console.log(err);
            res.status(422).json({err});
        })
}

function myPlaces(req, res){
    User.findOne({'_id': req.user.id}).then(user=>{
        console.log(user.places);
        user.places.then(places=>{
            res.json(places);
        })
        }).catch(err=>{
            console.log(err);
            res.json(err);
    })
}

module.exports = { create, myPlaces };
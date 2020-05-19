const buildParams = require('./helpers').paramsBuilder;

const validParams = ['_place'];

const FavoritePlace = require('../models/FavoritePlace');

function find(req, res, next){
    FavoritePlace.findById(req.params.id).then(fav=>{
        req.mainObj = fav;
        req.favorite = fav;
        next();
    }).catch(next);
}

function create(req, res){
    let params = buildParams(validParams, req.body);
    params['_user'] = req.user.id;

    FavoritePlace.create(params)
        .then(favorite=>{
            res.json(favorite);
        }).catch(error=>{
            res.status(422).json(error);
        })
}

function destroy(req, res){
    req.favorite.remove().then(doc=>{
        res.json({});
    }).catch(err=>{
        res.status(500).json({error});
    })
}

module.exports = { find, create, destroy };
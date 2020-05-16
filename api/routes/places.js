const express = require('express');
const Place = require('../models/Place');

let router = express.Router();

router.route('/')
    .get((req, res) => {
        Place.find({})
          .then(docs => {
              res.json(docs);
          }).catch(err => {
            console.log(err);
            res.json(err);
          })
      })
    .post((req, res)=> {
        Place.create({
          title: req.body.title,
          description: req.body.description,
          acceptsCreditCard: req.body.acceptsCreditCard,
          openHour: req.body.openHour,
          closeHour: req.body.closeHour
        })
          .then(doc => {
            res.json(doc);
          }).catch (err => {
            console.log(err);
            res.json(err);
          })
      })

      router.route('/:id')
      .get((req, res)=> {
        //Place.findOne()
        Place.findById(req.params.id)
          .then(doc => {
            res.json(doc);
          }).catch(err => {
            console.log(err);
            res.json(err);
          });
      })
      .put((req,res)=>{
  
        const placeParams = req.body;
      
        Place.findByIdAndUpdate(req.params.id, placeParams, {new: true})
          .then(doc=>{
            res.json(doc);
          }).catch(err=>{
            console.log(err);
            res.json(err);
          });
      })
      .delete((req, res)=>{
        Place.findByIdAndRemove(req.params.id)
          .then(doc =>{
            res.json(doc);
          }).catch(err => {
            res.json(err);
            console.log(err);
          })
      })

module.exports = router;
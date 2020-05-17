const Place = require('../models/Place');

function find(req, res, next){
  Place.findById(req.params.id)
    .then (place => {
      req.place = place;
      next();
    }).catch(err => {
      next(err);
    })
}

//Show all places
function index(req, res){
    Place.paginate({}, { page: req.query.page || 1, limit: 8, sort: {'_id': -1} })
          .then(docs => {
              res.json(docs);
          }).catch(err => {
            console.log(err);
            res.json(err);
          });
}


//Create a new place
function create(req, res) {
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
        });
}


//Show one place by id
function show(req, res){
  res.json(req.place);
}


//Update place
function update(req, res){
  const placeParams = req.body;

  req.place = Object.assign(req.place, placeParams);
     
  req.place.save().then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });

}

//delete place
function destroy(req, res){
    req.place.remove().then(doc =>{
            res.json(doc);
          }).catch(err => {
            res.json(err);
            console.log(err);
          })
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy,
    find
}
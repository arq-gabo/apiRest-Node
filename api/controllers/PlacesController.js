const Place = require('../models/Place');
const upload = require('../config/upload');
const helpers = require('./helpers');

const validParams = ['title', 'description', 'address', 'acceptsCreditCard', 'openHour', 'closeHour'];

function find(req, res, next){
  Place.findOne({slug:req.params.id})
    .then (place => {
      req.place = place;
      req.mainObj = place;
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
function create(req, res, next) {
    const params = helpers.paramsBuilder(validParams , req.body);
    console.log(req.user);
    params['_user'] = req.user.id;
    Place.create(params)
        .then(doc => {
          req.place = doc;
          next();
        }).catch (err => {
          next(err);
        });
}


//Show one place by id
function show(req, res){
  res.json(req.place);
}


//Update place
function update(req, res){
  
  const params = helpers.paramsBuilder(validParams , req.body);
  req.place = Object.assign(req.place, params);
     
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


function multerMiddleware(){
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount: 1}
  ])
}

function saveImage(req, res){
  if(req.place){
    const files = ['avatar', 'cover'];
    const promises = [];

    files.forEach(imageType=>{
      if(req.files && req.files[imageType]){
        const path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path, imageType));
      }
    })
  
    Promise.all(promises).then(results=>{
      console.log(results);
      res.json(req.place);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });

  } else {
    res.status(422).json({
      error: req.error || 'Could Not Save Place'
    });
  }
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy,
    find,
    multerMiddleware,
    saveImage
}
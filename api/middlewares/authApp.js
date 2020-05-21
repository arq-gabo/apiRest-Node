const Application = require('../models/Application');


module.exports = function(req, res, next){
    Application.count({}).then(appCount=>{
        if(appCount > 0 && !req.application) return next(new Eroor('An Application is required to consume this API'));

        req.validApp = true;
        next();
    }).catch(next);
}
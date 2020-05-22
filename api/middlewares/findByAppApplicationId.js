const Application = require('../models/Application');

module.exports = function(req, res, next){
    if(req.application) return next();

    const applicationId = req.headers.application;

    if(!applicationId) return next();

    Application.findOne({applicationId})
        .then(app=>{
            if(!app) return next(new Error('Invalid Application'));
            req.application = app;
            next ();
        }).catch(next);
}


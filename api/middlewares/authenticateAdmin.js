module.exports = function(req, res, next){
    if(req.fullUser && req.fullUser.admin) return next();

    next(new Error('You no have permissions to be here'));
}
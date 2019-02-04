
/**
 *  For Middlewares -- checking condition
 */

var middlewareObj = {};




/**
 * [isLoggedIn : Checks whether user is logged in or not ] 
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [If all things are good go as usual]
 * @return {Boolean}       [description]
 */
middlewareObj.isLoggedIn = function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("error","Please Login First!");
		res.redirect("/login");
}

module.exports = middlewareObj;
/**
 *  Frameworks
 */

var express   = require("express"),
	router 	  = express.Router(),
	middleware= require("../middleware");


/**
 *  "/" --> home page
 */

router.get("/",checkLoggedIn,function(req,res){
    	req.flash('info','You Here');
		res.render("landing");
});


/**
 *  main page after logging in
 */


router.get("/writings_in_which",middleware.isLoggedIn,function(req,res){  // put middleware

		res.render("home");
});



/**
 *  If user is logged in . he/she cant access home page
 */

function checkLoggedIn(req,res,next){
	if(req.isAuthenticated()){
 		res.redirect("/writings_in_which");
	}
	next();
}


/**
 *   exporting to the app.js
 */

module.exports = router;
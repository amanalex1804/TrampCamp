
var express    = require("express"),
	router 	   = express.Router(),
	passport   = require("passport"),
	User       = require("../models/user");


/**
 *  Signup part
 */

router.get("/register",function(req,res){
		res.render("register");
});


router.post("/register",function(req,res){
		var newUser = new User({username: req.body.username});
		User.register(newUser,req.body.password,function(err,user){
				if(err){
					req.flash("error",err);
					return res.render("register");
				}
				passport.authenticate("local")(req,res,function(){
					req.flash("success","Welcome to Writings_in_Which :"+user.username);
					res.redirect("/writings_in_which");
				});
		});
});


/**
 * Login Part
 */


router.get("/login",function(req,res){

		res.render("login");
});


router.post("/login",passport.authenticate("local",
{
	successRedirect : "/writings_in_which",
	failureRedirect : "/login"
}),
  function(req,res){

  });

	

/**
 * Logout Part
 */



router.get("/logout",function(req,res){

	    req.logout();
		req.flash("success","Logged Out");
		res.redirect("/");
});












	module.exports = router ;
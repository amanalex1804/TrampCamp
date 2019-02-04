/**
 *   Route for Sticky Notes part
 */

var express        = require("express"),
 	router         = express.Router(),
 	middleware     = require("../middleware"),
 	Sticky_notes   = require("../models/sticky_notes"),
 	date           = require("date-and-time");



 /**
  *  Show the sticky notes of current
  */
 

 router.get("/writings_in_which/sticky_notes",middleware.isLoggedIn,function(req,res){
 		Sticky_notes.find({'author.id': req.user._id},function(err,allSticky_notes){
 			if(err){
 				console.log(err);
 			}else{
 				res.render("sticky_notes/show",{sticky_notes : allSticky_notes, currentUser : req.user});
 			}
 		})
 });


 /**
  *   Show the more info about a sticky_note
  */
 
 router.get("/writings_in_which/sticky_notes/new",middleware.isLoggedIn,function(req,res){
 			res.render("sticky_notes/new");
 });


 /**
  *  Post new sticky notes
  */

router.post("/writings_in_which/sticky_notes",middleware.isLoggedIn,function(req,res){
		var description  = req.body.description;
		var now          = new Date().toDateString('DD/MM/YYYY');

		var author       = {
			id         : req.user._id,
			username   : req.user.username
		}

		var newSticky_notes ={description:description,date: now,author : author};

		Sticky_notes.create(newSticky_notes,function(err,newlyCreated){
			if(err){
				console.log(err);
			}else{
				res.redirect("/writings_in_which/sticky_notes");
			}
		});
});


/**
 *  Info about a particular sticky_notes
 */

 router.get("/writings_in_which/sticky_notes/:id",middleware.isLoggedIn,function(req,res){
 		Sticky_notes.findById(req.params.id,function(err,foundSticky_notes){
 			if(err){
 				console.log(err);
 			}else{
 				res.render("sticky_notes/index",{sticky_notes: foundSticky_notes});
 			}
 		});
 });



/**
 *  Edit the particular entry
 */


router.get("/writings_in_which/sticky_notes/:id/edit",middleware.isLoggedIn,function(req,res){
		Sticky_notes.findById(req.params.id,function(err,foundSticky_notes){
			res.render("sticky_notes/edit",{sticky_notes: foundSticky_notes});
		});
});


/**
 *  Updating the edited part
 */

router.put("/writings_in_which/sticky_notes/:id",middleware.isLoggedIn,function(req,res){
	    console.log("here");
		Sticky_notes.findByIdAndUpdate(req.params.id,req.body.sticky_notes,function(err,updatedSticky_notes){
			if(err){
				res.redirect("/writings_in_which/sticky_notes");
			}else{
				res.redirect("/writings_in_which/sticky_notes/"+req.params.id);
			}
		});
});











/**
 *  To destroy an entry
 */

router.delete("/writings_in_which/sticky_notes/:id",middleware.isLoggedIn,function(req,res){
	Sticky_notes.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/writings_in_which/sticky_notes");
		}else{
			res.redirect("/writings_in_which/sticky_notes");
		}
	})
})




 module.exports = router;
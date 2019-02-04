
/**
 *  For having the user's diary things
 */

var express        = require("express"),
    router         = express.Router(),
    middleware     = require("../middleware"),
    Diary          = require("../models/diary"),
    date           = require("date-and-time");

/**
 *  Show the diary entry by current looged in user
 */

 router.get("/writings_in_which/diary",middleware.isLoggedIn,function(req,res){


 		/**
 		 * To find the data created by logged in user
 		 */
 		Diary.find({'author.id':req.user._id},function(err,allDiary){
 			if(err){
 				console.log(err);
 			}else{
 				res.render("diary/show",{diary: allDiary,currentUser:req.user});
 			}
 		});
 });

 /**
  *  If the current user wants to make a new diary entry
  */

router.get("/writings_in_which/diary/new",middleware.isLoggedIn,function(req,res){
		res.render("diary/new");
});


/**
 *  Post new entry in his log
 */

router.post("/writings_in_which/diary",middleware.isLoggedIn,function(req,res){
	
		var subject        = req.body.subject;
		var description    = req.body.description;
		var now            = new Date().toDateString('DD/MM/YYYY');
		
		var tim            = new Date().toTimeString();
		
		
		
		var author   = {
			id : req.user._id,
			username : req.user.username
		}

		var newDiary = {subject:subject,description:description,date:now,time:tim,author:author};

		Diary.create(newDiary,function(err,newlyCreated){
			if(err){
				console.log(err);
			}else{
                  req.flash("success","added");
                  res.redirect("/writings_in_which/diary");
			}
		});

});

/**
 *  Info about a particular entry
 */

router.get("/writings_in_which/diary/:id",middleware.isLoggedIn,function(req,res){
	Diary.findById(req.params.id,function(err,foundDiary){
		if(err){
			console.log(err);
		}else{
			res.render("diary/index",{diary : foundDiary});
		}
	});
});


/**
 *  Edit the particular entry
 */


router.get("/writings_in_which/diary/:id/edit",middleware.isLoggedIn,function(req,res){
		Diary.findById(req.params.id,function(err,foundDiary){
			res.render("diary/edit",{diary : foundDiary});
		});
});


/**
 *  Updating the edited part
 */

router.put("/writings_in_which/diary/:id",middleware.isLoggedIn,function(req,res){
		Diary.findByIdAndUpdate(req.params.id,req.body.diary,function(err,updatedDiary){
			if(err){
				res.redirect("/writings_in_which/diary");
			}else{
				res.redirect("/writings_in_which/diary/"+req.params.id);
			}
		});
});











/**
 *  To destroy an entry
 */

router.delete("/writings_in_which/diary/:id",middleware.isLoggedIn,function(req,res){
	Diary.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/writings_in_which/diary");
		}else{
			res.redirect("/writings_in_which/diary");
		}
	})
})

 module.exports = router;   
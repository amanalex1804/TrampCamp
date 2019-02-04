 /**
  *  For user's bookmarked blogs link
  */
 

var express        = require("express"),
    router         = express.Router(),
    middleware     = require("../middleware"),
    Blogs          = require("../models/blogs");
    


/**
 *  Show all blogs by current looged in user
 */

 router.get("/writings_in_which/blogs",middleware.isLoggedIn,function(req,res){


 		/**
 		 * To find the data created by logged in user
 		 */
 		Blogs.find({'author.id':req.user._id},function(err,allBlogs){
 			if(err){
 				console.log(err);
 			}else{
 				res.render("blogs/show",{blogs: allBlogs,currentUser:req.user});
 			}
 		});
 });

 /**
  *  If the current user wants to make a new diary entry
  */

router.get("/writings_in_which/blogs/new",middleware.isLoggedIn,function(req,res){
		res.render("blogs/new");
});






/**
 *  Post new entry in his log
 */

router.post("/writings_in_which/blogs",middleware.isLoggedIn,function(req,res){
	
		var link        = req.body.link;
		var description    = req.body.description;
		
		
		
		var author   = {
			id : req.user._id,
			username : req.user.username
		}

		var newBlogs = {link : link,description:description,author:author};

		Blogs.create(newBlogs,function(err,newlyCreated){
			if(err){
				console.log(err);
			}else{
                  req.flash("success","added");
                  res.redirect("/writings_in_which/blogs");
			}
		});

});

/**
 *  Info about a particular entry
 */

router.get("/writings_in_which/blogs/:id",middleware.isLoggedIn,function(req,res){
	Blogs.findById(req.params.id,function(err,foundBlogs){
		if(err){
			console.log(err);
		}else{
			res.render("blogs/index",{blogs : foundBlogs});
		}
	});
});


/**
 *  Edit the particular entry
 */


router.get("/writings_in_which/blogs/:id/edit",middleware.isLoggedIn,function(req,res){
		Blogs.findById(req.params.id,function(err,foundBlogs){
			res.render("blogs/edit",{blogs : foundBlogs});
		});
});


/**
 *  Updating the edited part
 */

router.put("/writings_in_which/blogs/:id",middleware.isLoggedIn,function(req,res){
		Blogs.findByIdAndUpdate(req.params.id,req.body.blogs,function(err,updatedBlogs){
			if(err){
				res.redirect("/writings_in_which/blogs");
			}else{
				res.redirect("/writings_in_which/blogs/"+req.params.id);
			}
		});
});











/**
 *  To destroy an entry
 */

router.delete("/writings_in_which/blogs/:id",middleware.isLoggedIn,function(req,res){
	Blogs.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/writings_in_which/blogs");
		}else{
			res.redirect("/writings_in_which/blogs");
		}
	})
})

 module.exports = router;   
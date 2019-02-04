/**
 * Frameworks
 */

var express 	  = require("express"),
    app           = express(),
    cookieParser  = require("cookie-parser"),
    session       = require("express-session"),
    bodyParser    = require("body-parser"),
    mongoose 	  = require("mongoose"),
    passport	  = require("passport"),
    LocalStrategy = require("passport-local"),
    flash         = require("connect-flash"),
    methodOverride= require("method-override"),
    User          = require("./models/user")
    seedDB        = require("./seed");

 //seedDB();
/**
 * Connecting to  mongoodse database 
 * node cmd -> C:\Program Files\MongoDB\Server\4.0\bin -> mongo ->show dbs
 */

mongoose.connect("mongodb://localhost/writings_in_which");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


/**
 *  Sessions for flash
 */


app.use(require("express-session")({
		secret			  : "Zing is lob",
		resave 			  : false,
		saveUninitialised : false

}));








//  app.use(flash());

// app.use(cookieParser('keyboard cat'));
// app.use(session({cookie : {maxAge : 60000}}));
// app.use(flash());



/**
 *  Passport configuration
 */

 app.use(passport.initialize());
 app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






/**
 *  Using middleware in all routes
 */

app.use(function(req,res,next){
		res.locals.currentUser = req.user;
		res.locals.error       = req.flash("error");
		res.locals.success	   = req.flash("success");
		next();
});



/**
 *  importing routes
 */

var landingRoutes       = require("./routes/landing");
app.use(landingRoutes);
var indexRoutes         = require("./routes/index");
app.use(indexRoutes);
var diaryRoutes         = require("./routes/diary");
app.use(diaryRoutes);
var sticky_notesRoutes  = require("./routes/sticky_notes");
app.use(sticky_notesRoutes);
var blogsRoutes         = require("./routes/blogs");
app.use(blogsRoutes);


/**
 * Port
 */

 app.listen(3000,function(){
 		console.log("Server Started");	
 }) ;  
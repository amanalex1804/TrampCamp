/**
 *  Schema for diary when user logged in
 */
 
 var mongoose = require("mongoose");

 var diarySchema = new mongoose.Schema({
 		date      : String,
 		time      : String,
 		description     : String,
 		subject     : String,
 		author    :{
 			id:{
 				type : mongoose.Schema.Types.ObjectId,
 				ref  : "User"
 			},
 			username : String
 		}

 });


 module.exports = mongoose.model("Diary",diarySchema);

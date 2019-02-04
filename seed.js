/**
 *  To give initial data to work on
 */

var mongoose  = require("mongoose"),
    User      = require("./models/user"),
    Diary     = require("./models/diary");


 var data = [
 {
 	date:"19thMay",
 	time:"DOnt care",
 	subject:"She is cool",
 	description : " I dont know what i'm doing"
 },
 {
 	date :"3rdJan",
 	time :" okay",
 	subject: "BITHC",
 	description: "NO abuse"
 }

 ]   


 function seedDB(){
 	Diary.remove({},function(err){
 		if(err){
 			console.log(err);
 		}else{
 			data.forEach(function(seed){
 				Diary.create(seed,function(err,diary){
 					if(err){
 						console.log(err);
 					}else{
 						console.log("removes");
 						diary.save();
 					}
 				});
 			});
 		}
 	});
 }

 module.exports = seedDB;
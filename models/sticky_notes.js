/**
 *  Schema for sticky notes 
 */

var mongoose = require("mongoose");

var sticky_notesSchema = new mongoose.Schema({
		date            : String,
		description     : String,
		author          :{
			id: {
				type : mongoose.Schema.Types.ObjectId,
				ref  : "User"
			},
			username : String
		}
    	
}); 


module.exports = mongoose.model("Sticky_notes",sticky_notesSchema);
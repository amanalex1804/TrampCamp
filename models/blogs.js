/**
 *  Schema for blog links
 */

var mongoose = require("mongoose");

var blogsSchema = new mongoose.Schema({
		link           : String,
		description    : String,
		author         :{
			id : {
				type : mongoose.Schema.Types.ObjectId,
				ref  : "User"
			},
			username : String
		}
});

module.exports = mongoose.model("Blogs",blogsSchema);
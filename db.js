const mongoose = require('mongoose')

const connectDB = async () =>{
	try{
		const conn = await mongoose.connect("mongodb+srv://gourav:22220000@onlineshop.spnzr.mongodb.net/onlineshop",{
			useUnifiedTopology : true,
			useNewUrlParser : true,
			useCreateIndex : true
		})
		console.log("connected");
	}
	catch (error){
		console.log(error);
		process.exit(1)
	}
}

module.exports = connectDB


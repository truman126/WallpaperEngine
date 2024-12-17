const mongoose = require('mongoose')
require("dotenv").config({path:".env.local"});

require("dotenv").config();

	

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.catch(e => {
        console.error('Connection error', e.message)
    })
	
const db = mongoose.connection
	
console.log("MONGO CONNECTION: ", mongoose.connection.readyState);

module.exports = db


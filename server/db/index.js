const mongoose = require('mongoose')
	

mongoose
    .connect('***REMOVED***', { useNewUrlParser: true })
	.catch(e => {
        console.error('Connection error', e.message)
    })
	

const db = mongoose.connection
	

module.exports = db


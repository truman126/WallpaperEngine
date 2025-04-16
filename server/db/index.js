import mongoose from 'mongoose';
import dotenv from 'dotenv';  // Import dotenv
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.catch(e => {
        console.error('Connection error', e.message)
    })
	
export default db = mongoose.connection


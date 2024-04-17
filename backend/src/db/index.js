import mongoose from "mongoose"
import { DB_NAME } from "../utils/constants.js";

export const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DB connected || DB Host: ${connection.connection.host}`);        
    } catch (error) {
        console.log(error);
        process.exit(1);        
    }
}

export default connectDB;
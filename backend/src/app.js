import express from "express"
import dotenv from "dotenv"

const app = express();

dotenv.config({
    path:'./.env'
})
//middlewares
app.use(express.json());

//routes
import apiRoute from "./routes/api.js";
import connectDB from "./db/index.js";

app.use('/api/v1/',apiRoute);

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`server is running on port: ${process.env.PORT || 3000}`);
    })
    app.on('error',(err)=>{
        // console.log("error in app: ",err);
        console.log("app");
        
        throw err;    
    })
})
.catch((err)=>{
    // console.log("DB connection error: ",err);
    console.log("db");
    
})



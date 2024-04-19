import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express();

dotenv.config({
    path:'./.env'
})
//middlewares
app.use(cors())
app.use(express.json());

//routes
import apiRoute, { apiProtector } from "./routes/api.js";
import connectDB from "./db/index.js";
import AuthMiddleware from "./middlewares/Auth.middleware.js";

app.use('/api/v1/',apiRoute);
app.use('/api/v1/',AuthMiddleware,apiProtector);

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



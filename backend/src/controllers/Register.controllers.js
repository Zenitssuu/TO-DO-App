import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { jsonGenerator } from "../utils/helper.js";
import { JWT_SECRET_TOKEN, statusCode } from "../utils/constants.js";
import bcrypt from "bcrypt"
import { User } from "../models/Users.models.js";

const register = async (req,res)=>{
    
    const errors = validationResult(req);

    if(errors.isEmpty()){
        const { name, username, password, email } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password,salt);

        const existedUser = await User.findOne({
            $or: [{username},{email}]
        })

        if(existedUser){
            return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY,"User already exists"))
        }

        //save to db
        try {
            const newUser = await User.create({
                name:name,
                username:username,
                password:hashPassword,
                email:email
            })

            const token = jwt.sign({userId:newUser._id},JWT_SECRET_TOKEN)

            return res.json(jsonGenerator(statusCode.SUCCESS,"Registration Successful",{
                userId:newUser._id,
                token:token
            }))
        } catch (error) {
            console.log("here");
            
            // console.log("error while creating user", error);            
        }
    }
    res.send(jsonGenerator(statusCode.VALIDATION_ERROR,"VALIDATION ERROR",errors.mapped()))

}

export default register
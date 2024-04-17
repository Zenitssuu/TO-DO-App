import { validationResult } from "express-validator";
import { User } from "../models/Users.models.js";
import { jsonGenerator } from "../utils/helper.js";
import { JWT_SECRET_TOKEN, statusCode } from "../utils/constants.js";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"

const login = async (req,res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        const { username, password } = req.body;

        const user = await User.findOne({
            username:username
        })

        if(!user){
            return res.send(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY,"username or password is incorrect"));
        }

        const verified = await bycrpt.compare(password,user.password);

        if(!verified){
            return res.send(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY,"password is incorrect"));
        }

        const token = jwt.sign({userId:user._id},JWT_SECRET_TOKEN);

        return res.json(jsonGenerator(statusCode.SUCCESS,"login successful",
        {
            userId:user._id,
            token:token
        }))
    }

    res.json(jsonGenerator(statusCode.VALIDATION_ERROR,"validation error",errors.mapped()))
}

export default login;
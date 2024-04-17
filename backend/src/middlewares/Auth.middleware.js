import { JWT_SECRET_TOKEN, statusCode } from "../utils/constants.js"
import { jsonGenerator } from "../utils/helper.js"
import jwt from "jsonwebtoken"

const AuthMiddleware = (req,res,next) => {
    if(req.headers["auth"] === undefined){
        return res.json(jsonGenerator(statusCode.AUTH_ERROR,"Access Denied"))
    }

    const token = req.headers['auth'];

    try {
        const decoded = jwt.verify(token,JWT_SECRET_TOKEN);
        console.log(decoded);

        req.userId = decoded.userId;

        return next();
        
    } catch (error) {
        console.log(error);
        
        return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY,"invalid token"))
        
    }
};

export default AuthMiddleware
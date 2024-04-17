import express from "express"
import register from "../controllers/Register.controllers.js";
import login from "../controllers/Login.controllers.js";
import { RegisterSchema } from "../validatorSchema/registerSchema.js";
import { loginSchema } from "../validatorSchema/loginSchema.js";

const apiRoute = express.Router();


apiRoute.post('/register',RegisterSchema,register);
apiRoute.post('/login',loginSchema,login)

export default apiRoute
import express from "express"
import register from "../controllers/Register.controllers.js";
import { RegisterSchema } from "../validatorSchema/registerSchema.js";

const apiRoute = express.Router();


apiRoute.post('/register',RegisterSchema,register)

export default apiRoute
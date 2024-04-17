import { User } from "../models/Users.models.js"
import { statusCode } from "../utils/constants.js";
import { jsonGenerator } from "../utils/helper.js";


export const getTodos = async (req,res) => {
    try {
        const list = await User.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec();

         
        return res.json(jsonGenerator(statusCode.SUCCESS,"All todo list",list))
    } catch (error) {
        console.log(error);
        return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY,"error while fetching todos"),error)
        
    }
}
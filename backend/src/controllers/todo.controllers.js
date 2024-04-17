import { validationResult } from "express-validator";
import { jsonGenerator } from "../utils/helper.js";
import { statusCode } from "../utils/constants.js";
import {User} from "../models/Users.models.js";
import { Todo } from "../models/Todo.models.js";

export const createTodo = async (req, res) => {
    console.log(req.body);
    
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerator(
        statusCode.VALIDATION_ERROR,
        "Todo description is required",
        error.mapped()
      )
    );
  }
  console.log(1);
  
  try {
    const result = await Todo.create({
      userId: req.userId,
      desc: req.body.desc,
    });
    
    console.log("results ",result);    

    if (result) {
        const user = await User.findOneAndUpdate(
            {
                $push:{todos:result}
            }
        )
        return res.json(jsonGenerator(statusCode.SUCCESS,"Todo Created Successfully",result))
    }
  } catch (error) {
        console.log(error);
        return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY,"something went wrong while creating todo",error));
  }
};

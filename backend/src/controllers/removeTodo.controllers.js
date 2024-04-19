import { validationResult } from "express-validator";
import { jsonGenerator } from "../utils/helper.js";
import { statusCode } from "../utils/constants.js";
import { Todo } from "../models/Todo.models.js";
import { User } from "../models/Users.models.js";

export const removeTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerator(
        statusCode.VALIDATION_ERROR,
        "todo id is required",
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.findOneAndDelete(
        {
            userId:req.body.userId,
            _id:req.body.todo_id
        }
    )

    if(result){
        const user = await User.findOneAndUpdate(
            {
                _id:req.userId
            },
            {
                $pull:{todos:req.body.todo_id}
            }
        );

        return res.json(jsonGenerator(statusCode.SUCCESS,"todo deleted",result))
    }

  } catch (error) {
    console.log(error);
    return res.json(jsonGenerator(statusCode.VALIDATION_ERROR,"could not delete",error));    
  }
};

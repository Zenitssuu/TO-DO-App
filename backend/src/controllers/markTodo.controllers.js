import { validationResult } from "express-validator";
import { jsonGenerator } from "../utils/helper.js";
import { statusCode } from "../utils/constants.js";
import { Todo } from "../models/Todo.models.js";

export const markTodo = async (req, res) => {
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
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        userId: req.body.userId,
      },
      [
        {
          $set: {
            isCompleted: {
              $eq: [false, "$isCompleted"],
            },
          },
        },
      ]
    );

    if(todo){
        return res.json(jsonGenerator(statusCode.SUCCESS,"updated",todo))
    }


  } catch (error) {
    console.log(error);
    return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY,"could not update"));
    
  }
};

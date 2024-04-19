import { check } from "express-validator";

export const removeTodoSchema = [
    check('todo_id','todo id is required')
    .exists()
]
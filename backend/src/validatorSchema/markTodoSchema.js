import { check } from "express-validator";

export const markTodoSchema = [
    check('todo_id','Todo id is required')
    .exists()
]
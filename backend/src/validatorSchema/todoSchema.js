import { check } from "express-validator";

export const todoSchema = [
    check('desc','Todo description is required')
    .exists()
]
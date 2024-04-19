import express from "express"
import register from "../controllers/Register.controllers.js";
import login from "../controllers/Login.controllers.js";
import { RegisterSchema } from "../validatorSchema/registerSchema.js";
import { loginSchema } from "../validatorSchema/loginSchema.js";
import { createTodo } from "../controllers/todo.controllers.js";
import { check } from "express-validator";
import { todoSchema } from "../validatorSchema/todoSchema.js";
import { getTodos } from "../controllers/todoList.controllers.js";
import { markTodo } from "../controllers/markTodo.controllers.js";
import { markTodoSchema } from "../validatorSchema/markTodoSchema.js";
import { removeTodo } from "../controllers/removeTodo.controllers.js";
import { removeTodoSchema } from "../validatorSchema/removeTodoSchema.js";

const apiRoute = express.Router();
export const apiProtector = express.Router();

apiRoute.post('/register',RegisterSchema,register);
apiRoute.post('/login',loginSchema,login)

//protected route
apiProtector.post('/createTodo',todoSchema,createTodo);
apiProtector.get('/todoList',getTodos);
apiProtector.post('/markTodo',markTodoSchema,markTodo);
apiProtector.post('/removeTodo',removeTodoSchema,removeTodo);



export default apiRoute
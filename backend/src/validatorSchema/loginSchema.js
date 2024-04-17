import { check } from "express-validator";

export const loginSchema = [
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username should be alphanumeric character only")
    .trim()
    .isLength({ min: 6, max: 13 }),

  check("password", "password is required")
    .exists()
    .isLength({ min: 6, max: 100 })
    .trim(),

];

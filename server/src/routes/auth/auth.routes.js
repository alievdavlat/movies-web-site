import { Router } from "express";
import authController from "../../controllers/auth.controllers.js";
import { body } from "express-validator";
import userModel from "../../models/user.model.js";
import requestHandler from "../../handlers/request.handler.js";

const auth = Router();

auth.post(
  "/signup",

  body("username")
    .isLength({ min: 0 })
    .withMessage("username minimum 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username already used");
    }),

  body("password")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters"),

  body("confirmPassword")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters")
    .custom((value, {req}) => {
      if (value !== req.body.password)
        throw new Error("confirmPassword not match");
      return;
    }),
  body("displayName")
    .isLength({ min: 0 })
    .withMessage("displayName minimum 8 charaters"),
  requestHandler.validate,
  authController.signUp
);

auth.post(
  '/signin',
body("username")
  .isLength({ min: 0 })
  .withMessage("username minimum 8 characters"),

body("password")
  .isLength({ min: 0 })
  .withMessage("password minimum 8 characters"),

  requestHandler.validate,
  authController.signIn
)

export default auth;

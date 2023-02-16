require("dotenv").config();
const express = require("express");
const api = express();
const port = 7777;
const { appStarter } = require("./utilities");
const { authController, notFoundController } = require("./controllers");
const { validateSignupMiddleware, validateSigninMiddleware } = require("./controllers/validators/auth.validators");

api.use(express.json());

api.use(
  express.urlencoded({
    extended: true,
  })
);

api.get("/welcome", authController.getBase);
api.post("/signup", validateSignupMiddleware, authController.Signup);
api.post("/login",validateSigninMiddleware  ,authController.Signin);
api.all("*", notFoundController);
api.listen(port, appStarter(port));

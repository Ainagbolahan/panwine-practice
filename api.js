const express = require("express");
const api = express();
const port = 7777;
const { appStarter } = require("./utilities");
const { authController, notFoundController } = require("./controllers");

api.use(express.json());

api.use(
  express.urlencoded({
    extended: true,
  })
);

api.get("/welcome", authController.getBase);
api.post("/signup", authController.Signup);
api.all("*", notFoundController);
api.listen(port, appStarter(port));

const bodyValidator = require("../../middlewares/body-validator.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const authCtrl = require("./auth.controller");
const { RegisterDTO, LoginDTO } = require("./auth.validator");

const authRouter = require("express").Router();

authRouter.post( "/register", uploader().single("image"), bodyValidator(RegisterDTO), authCtrl.register);
authRouter.get("/activate/:token", authCtrl.activateUser);
authRouter.post("/login", bodyValidator(LoginDTO), authCtrl.login);

module.exports = authRouter;

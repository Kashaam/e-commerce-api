const auth = require("../../middlewares/auth.middleware");
const bodyValidator = require("../../middlewares/body-validator.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const authCtrl = require("./auth.controller");
const { RegisterDTO, LoginDTO, ResetPasswordRequestDTO, ResetPasswordDTO, UpdateUserDTO } = require("./auth.validator");


const authRouter = require("express").Router();

authRouter.post( "/register", uploader().single("image"), bodyValidator(RegisterDTO), authCtrl.register);
authRouter.get("/activate/:token", authCtrl.activateUser);
authRouter.post("/login", bodyValidator(LoginDTO), authCtrl.login);
authRouter.get("/log-out", auth(), authCtrl.logOut);

authRouter.get('/me', auth(), authCtrl.me);
// authRouter.get('/me', auth(["admin"]), authCtrl.me);

authRouter.put('/update/:id', auth(["admin"]), bodyValidator(UpdateUserDTO), authCtrl.updateUser)

// forget password
authRouter.post('/forget-password', bodyValidator(ResetPasswordRequestDTO), authCtrl.forgetPassword);
authRouter.get('/forget-password-verify/:token', authCtrl.forgetPasswordVerify);
authRouter.put("/reset-password", bodyValidator(ResetPasswordDTO), authCtrl.resetPassword)




module.exports = authRouter;

const { Roles } = require('../../config/constant.config');
const auth = require('../../middlewares/auth.middleware');
const userCtrl = require('./user.controller');

const userRouter = require('express').Router();

userRouter.get("/", auth([Roles.ADMIN]), userCtrl.listAllUser)

userRouter.get("/:userId", auth([Roles.ADMIN]), userCtrl.getSingleUserById )


module.exports = userRouter;
const { Roles } = require('../../config/constant.config');
const auth = require('../../middlewares/auth.middleware');

const userRouter = require('express').Router();

userRouter.route()
          .get(auth([Roles.ADMIN]))


module.exports = userRouter;
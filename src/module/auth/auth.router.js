const bodyValidator = require('../../middlewares/body-validator.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const authCtrl = require('./auth.controller');
const { RegisterDTO } = require('./auth.validator');

const authRouter = require('express').Router();



authRouter.post('/register', uploader().single("image"), bodyValidator(RegisterDTO), authCtrl.register);


module.exports = authRouter;
const uploader = require('../../middlewares/uploader.middleware');
const authCtrl = require('./auth.controller');

const authRouter = require('express').Router();



authRouter.post('/register', uploader().single("image"), authCtrl.register);


module.exports = authRouter;
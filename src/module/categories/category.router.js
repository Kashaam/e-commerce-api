const { Roles } = require('../../config/constant.config');
const auth = require('../../middlewares/auth.middleware');
const bodyValidator = require('../../middlewares/body-validator.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const categoryCtrl = require('./category.controller');
const { CategoryCreateDTO } = require('./category.validator');

const categoryRouter = require('express').Router();


categoryRouter.route('/')
                .post(auth([Roles.ADMIN]), uploader().single("icon"), bodyValidator(CategoryCreateDTO), categoryCtrl.createCategory)
                .get(categoryCtrl.listAllCategory)




module.exports = categoryRouter;
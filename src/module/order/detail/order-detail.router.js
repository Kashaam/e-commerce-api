const { Roles } = require('../../../config/constant.config');
const auth = require('../../../middlewares/auth.middleware');
const bodyValidator = require('../../../middlewares/body-validator.middleware');
const orderDetailCtrl = require('./order-detail.controller');
const { AddToCartDTO } = require('./order-detail.validator');

const orderDetailRouter = require('express').Router();




orderDetailRouter.post("/add", auth([Roles.ADMIN, Roles.CUSTOMER]), bodyValidator(AddToCartDTO), orderDetailCtrl.addToCart)



module.exports = orderDetailRouter;
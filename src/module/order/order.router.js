const { Roles } = require('../../config/constant.config');
const auth = require('../../middlewares/auth.middleware');
const bodyValidator = require('../../middlewares/body-validator.middleware');
const orderDetailRouter = require('./detail/order-detail.router');
const oredrCtrl = require('./order.controller');
const { CheckOutDTO } = require('./order.validator');

const orderRouter = require('express').Router();




orderRouter.use('/detail', orderDetailRouter);



orderRouter.get('/checkout', auth([Roles.ADMIN, Roles.CUSTOMER]), bodyValidator(CheckOutDTO), oredrCtrl.checkOut);




module.exports = orderRouter;
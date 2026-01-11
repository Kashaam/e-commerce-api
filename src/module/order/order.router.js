const orderDetailRouter = require('./detail/order-detail.router');

const orderRouter = require('express').Router();




orderRouter.use('/detail', orderDetailRouter);








module.exports = orderRouter;
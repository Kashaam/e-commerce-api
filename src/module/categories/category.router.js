const categoryCtrl = require('./category.controller');

const categoryRouter = require('express').Router();


categoryRouter.route('/')
.post(categoryCtrl.createCategory)





module.exports = categoryRouter;
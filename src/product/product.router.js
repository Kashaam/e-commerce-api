const { Roles } = require('../config/constant.config');
const productCtrl = require('./product.controller');
const bodyValidator = require('../middlewares/body-validator.middleware');
const { CreateProductDTO, UpdateProductDTO } = require('./product.validator');
const auth = require('../middlewares/auth.middleware');
const uploader = require('../middlewares/uploader.middleware');


const productRouter = require('express').Router();



productRouter.get('/get-all-products', productCtrl.getAllPublicProduct)



productRouter.route("/")
            .post(auth([Roles.SELLER, Roles.ADMIN]), uploader().array('image'), bodyValidator(CreateProductDTO), productCtrl.registerProduct)
            .get(productCtrl.listProducts)


productRouter.route("/:productId")
            .get(productCtrl.getProductByUd)
            .put(auth([Roles.SELLER, Roles.ADMIN]), uploader().array('image'), bodyValidator(UpdateProductDTO), productCtrl.updateProductById)
            .delete(auth([Roles.ADMIN, Roles.SELLER]), productCtrl.deleteProductById)

module.exports = productRouter;
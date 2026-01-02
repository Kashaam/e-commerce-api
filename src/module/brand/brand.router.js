const auth = require("../../middlewares/auth.middleware");
const bodyValidator = require("../../middlewares/body-validator.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const brandCtrl = require("./brand.controller");
const { BrandCreateDTO } = require("./brand.validator");

const brandRouter = require("express").Router();

brandRouter.route("/")
    .post(auth(["admin"]), uploader().single("logo"), bodyValidator(BrandCreateDTO), brandCtrl.createBrand)
    .get(brandCtrl.listBrand)


module.exports = brandRouter;

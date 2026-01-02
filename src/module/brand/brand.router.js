const auth = require("../../middlewares/auth.middleware");
const bodyValidator = require("../../middlewares/body-validator.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const { UpdateUserDTO } = require("../auth/auth.validator");
const brandCtrl = require("./brand.controller");
const { BrandCreateDTO, UpdateBrandDTO } = require("./brand.validator");

const brandRouter = require("express").Router();

brandRouter.route("/")
    .post(auth(["admin"]), uploader().single("logo"), bodyValidator(BrandCreateDTO), brandCtrl.createBrand)
    .get(brandCtrl.listBrand)

brandRouter.route("/:brandId")
        .get(brandCtrl.getBrandByid)  
        .put(auth(["admin"]), uploader().single('logo'), bodyValidator(UpdateBrandDTO), brandCtrl.updateBrand)  


module.exports = brandRouter;

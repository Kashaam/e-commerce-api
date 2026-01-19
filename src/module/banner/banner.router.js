const { Roles } = require('../../config/constant.config');
const auth = require('../../middlewares/auth.middleware');
const bodyValidator = require('../../middlewares/body-validator.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const bannerCtrl = require('./banner.controller');
const { CreateBannerDTO, UpdateBannerDTO } = require('./banner.validator');

const bannerRouter = require('express').Router();


bannerRouter.route("/")
            .post(auth([Roles.ADMIN]), uploader().single('image'), bodyValidator(CreateBannerDTO), bannerCtrl.createBanner)
            .get(bannerCtrl.listAllBanners);


bannerRouter.route('/:bannerId')
            .put(auth([Roles.ADMIN]), uploader().single('image'), bodyValidator(UpdateBannerDTO), bannerCtrl.updateBanner)
            .delete(auth([Roles.ADMIN]), uploader().single('image'), bannerCtrl.removeBanner)
            .get(bannerCtrl.getBannerDetailById)

module.exports = bannerRouter;
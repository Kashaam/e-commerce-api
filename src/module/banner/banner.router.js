const { Roles } = require('../../config/constant.config');
const auth = require('../../middlewares/auth.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const bannerCtrl = require('./banner.controller');

const bannerRouter = require('express').Router();


bannerRouter.route("/")
            .post(auth([Roles.ADMIN]), uploader().single('image'), bannerCtrl.createBanner)
            .get(bannerCtrl.listAllBanners);


module.exports = bannerRouter;
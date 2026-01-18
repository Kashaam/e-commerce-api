const bannerSvc = require("./banner.service");

class BannerController {
  async createBanner(req, res, next) {
    try {
      const payload = await bannerSvc.transformCreateBanner(req);
      // const saveBanner =

      res.json({
        data: saveBanner,
        message: "Banner created successfully",
        status: "BANNER_CREATED_SUCCESSFULLY",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllBanners(req, res, next) {
    try {
      let filter = {};

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status
        };

        
      }
    } catch (exception) {
      next(exception);
    }
  }
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;

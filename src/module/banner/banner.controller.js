const bannerSvc = require("./banner.service");
const { Op } = require("sequelize");

class BannerController {
  async createBanner(req, res, next) {
    try {
      const payload = await bannerSvc.transformCreateBanner(req);
      const saveBanner = await bannerSvc.createBanner(payload);

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
          status: req.query.status,
        };

        if (req.query.search) {
          filter = {
            ...filter,
            [Op.iLike]: { title: `%${req.query.search}%` },
          };
        }

        const { data, pagination } = await bannerSvc.listAll(filter, req.query);

        res.json({
          data: data,
          message: "Banner listed successfully",
          sttaus: "BANNER_LISTED_SUCCESSFUL",
          options: pagination,
        });
      }
    } catch (exception) {
      next(exception);
    }
  }

  removeBanner = async (req, res, next) => {
    try {
      const bannerId = req.params.bannerId;
      const bannerDetail = await bannerSvc.getBannerById({ _id: bannerId });

      if (!bannerDetail) {
        throw {
          code: 402,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND",
          options: null,
        };
      }

      const destroyedBanner = await bannerSvc.deleteBanner(bannerDetail);

      res.json({
        data: destroyedBanner,
        message: "Banner deleted successfullt",
        status: "BANNER_DELETED_SUCCESSFULLY",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBanner = async(req, res, next)=>{
    try{
        const bannerId = req.params.bannerId;
        const bannerDetail = await bannerSvc.getBannerById({_id: bannerId});

        if(!bannerDetail){
            throw{
                code: 402,
                message: "Banner not found",
                status: "BANNER_NOT_FOUND",
                options: null
            }
        };


        const payload = await bannerSvc.transformUpdateBanner(req, bannerDetail);
        const updatedData = await bannerSvc.updateByFilter({_id: bannerId}, payload);

        res.json({
            data: updatedData,
            message: "Banner updated successfully",
            status: "BANNER_UPDATED_SUCCESSFULLY",
            options: null
        })
    }catch(exception){
        next(exception);
    }
  }

  async getBannerDetailById(req, res, next){
    try{
        const bannerId = req.params.bannerId;
        const bannerDetail = await bannerSvc.getBannerById({_id: bannerId});


        if(!bannerDetail){
            throw{
                code: 402,
                message: "Banner not found",
                status: "BANNER_NOT_FOUND",
            }
        }

        res.json({
            data: bannerDetail,
            message: "Banner detail fetched by id successfully",
            status: "BANNER_DETAIL_FETCHED_SUCCESS",
            options: null
        })
    }catch(exception){
        next(exception);
    }
  }
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;

const brandSvc = require("./brand.service");

class BrandController {
  createBrand = async (req, res, next) => {
    try {
      const payload = await brandSvc.transformCreateBrand(req);
      const brand = await brandSvc.create(payload);

      res.json({
        data: brand,
        message: "Brand created successfully",
        status: "SUCCESS_CREATE",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listBrand = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.search) {
        filter = {
          ...filter,
          name: new RegExp(req.query.search, "i"),
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      const { data, pagination } = await brandSvc.listAllRowsByFilter(
        req.query,
        filter
      );

      res.json({
        data: data,
        message: "Brand list",
        status: "BRAND_LIST_FETCHED_SUCCESS",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getBrandByid = async (req, res, next) => {
    try {
      const brandData = await brandSvc.getSingleRowByFilter({
        _id: req.params.brandId,
      });

      if (!brandData) {
        throw {
          code: 402,
          message: "Brand not found ",
          status: "BRAND_NOT_FOUND",
          options: null,
        };
      }

      res.json({
        data: brandData,
        message: "Brand Data fetched",
        status: "BRAND_DATA_FETCHED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  async updateBrand(req, res, next) {
    try {
      const brand = await brandSvc.getSingleRowByFilter({_id: req.params.brandId});
      if(!brand){
        throw{
          code: 402,
          message: "Brand not found",
          status: "BRAND_NOT_FOUND",
          options: nul
        }
      }

      const payload = await brandSvc.transformCreateBrand(req, brand);
      const updatedData = await brandSvc.updateSingleRowByFilter({_id: brand._id}, payload);

      res.json({
        data: updatedData,
        message: "Brand updated successfully",
        status: "BRAND_UPDATED",
        options: null
      })
    } catch (exception) {
      next(exception);
    }
  }

 async removeBrandById(req, res, next){
  try{
    const brandData = brandSvc.deleteSingleRowByFilter({_id: req.params.brandId});

    if(!brandData){
      throw{
        code: 402,
        message: "Brand not found",
        status: "BRAND_UNAVAILABLE",
        options: null
      }
    }


    res.json({
      data: brandData,
      message: "Brand deleted Successfully",
      status: "BRAND_DELETED_SUCCESSFULLY",
      options: null
    })
  }catch(exception){
    next(exception);
  }
 }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;

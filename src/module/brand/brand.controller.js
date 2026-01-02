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

  listBrand = async(req, res, next)=>{
    try{
      let filter = {};
      if(req.query.search){
        filter = {
          ...filter,
          name: new RegExp(req.query.search, "i")
        }
      }

      if(req.query.status){
        filter = {
          ...filter,
          status: req.query.status
        }
      }

      const {data, pagination} = await brandSvc.listAllRowsByFilter(req.query, filter);

      res.json({
        data: data,
        message: "Brand list",
        status: "BRAND_LIST_FETCHED_SUCCESS",
        options: pagination
      })
    }catch(exception){
      next(exception);
    }
  }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;

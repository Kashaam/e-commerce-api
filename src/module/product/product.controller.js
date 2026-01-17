const { Roles, Status } = require("../../config/constant.config");
const productSvc = require("./product.service");

class ProductController {
  registerProduct = async (req, res, next) => {
    try {
      const product = await productSvc.transformCreateProduct(req);
      const storeData = await productSvc.create(product);

      res.json({
        data: storeData,
        message: "Data created and stored successfully",
        status: "DATA_CREATED_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listProducts = async (req, res, next) => {
    try {
      let filter = {};
      let loggedInUser = req.loggedInuser;

      if (loggedInUser.role === Roles.SELLER) {
        filter = {
          ...filter,
          seller: req.loggedInUser._id,
        };
      }

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { description: new RegExp(req.query.search, "i") },
          ],
        };
      }

      if (+req.query.homeFeature === 1) {
        filter = {
          ...filter,
          homeFeature: true,
        };
      } else if (+req.query.homeFeature) {
        filter = {
          ...filter,
          homeFeature: false,
        };
      }

      const { data, pagination } = await productSvc.listAllProducts(
        req.query,
        filter
      );

      res.json({
        data: data,
        message: "Product listed for seller",
        status: "PRODUCT_LISTED_SELLER_ROLES",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getAllPublicProduct = async(req, res, next)=>{
    try{
         let filter = {
            status: Status.ACTIVE
        };


        if(req.query.search){
            filter = {
                ...filter,
                $or: [
                    {name: new RegExp(req.query.search, 'i')},
                    {description: new RegExp(req.query.search, 'i')}
                ]
            }
        }

        if(+req.query.homeFeature === 1){
            filter = {
                ...filter,
                homeFeature: true
            }
        }else if(+req.query.homeFeature === 0){
            filter = {
                ...filter,
                homeFeature: false
            }
        }

        const {data, pagination} = await productSvc.listAllProducts(req.query, filter);


        res.json({
            data: data,
            message: "All product data",
            status: "PRODUCT_LIST_SUCCESS",
            options: pagination
        })
    }catch(exception){
        next(exception);
    }
  }

  getProductByUd = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const productDetail = await productSvc.getSingleRowByFilter({
        _id: productId,
      });

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product not found",
          status: "PRODUCT_NOT_FOUND",
        };
      }

      res.json({
        data: productDetail,
        message: "Product fetched by id",
        status: "PRODUCT_DETAIL_FETCHED_BY_ID",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateProductById = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const productDetail = await productSvc.getSingleRowByFilter({
        _id: productId,
      });

      if (!productDetail) {
        throw {
          code: 404,
          message: "Product not found",
          status: "PRODUCT_NOT_FOUND",
        };
      }
      const payload = await productSvc.transformUpdateProduct(
        req,
        productDetail
      );

      const updatedData = await productSvc.updateSingleRowByFilter(
        { _id: productDetail._id },
        payload
      );

      res.json({
        data: updatedData,
        message: "Product updated successful",
        status: "PRODUCT_UPDATED_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteProductById = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const productDetail = await productSvc.getSingleRowByFilter({_id: productId});
        if(!productDetail){
            throw{
                code: 402,
                message: "Product not found",
                status: "PRODUCT_NOT_FOUND",
            }
        }

        const deleteProductData = await productSvc.deleteSingleRowByFilter(productDetail);

        res.json({
            data: deleteProductData,
            message: "Product deleted successfully",
            status: "PRODUCT_DELETED_SUCCESSFULLY",
            options: null
        });
    } catch (exception) {
      next(exception);
    }
  };

  getProductDetailWithProduct = async(req, res, nexr)=>{
    try{
      const slug = req.params.slug;
      const detail = await productSvc.getSingleRowByFilter({slug: slug});

      if(!detail){
        throw{
          code: 422,
          message: "Product not found",
          status: "PRODUCT_NOT_FOUND"
        }
      }

      const {data: relatedProduct} = await productSvc.listAllProducts({
        page: 1,
        limit: 10
      },
        {
        category: {$in: detail.category((cat)=>{cat._id})},
        _id: {$ne: detail._id}
      })

      res.json({
        data: {
          productDetail: detail,
          relatedProduct: relatedProduct
        },
        message: "Product fetched with slug",
        status: "PRODUCT_FETCHED_SUCCESS_USING_SLUG",
        options: null
      })

    }catch(exception){
      next(exception);
    }
  }
}

const productCtrl = new ProductController();
module.exports = productCtrl;

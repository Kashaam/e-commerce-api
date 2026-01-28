const { OREDR_STATUS } = require("../../../config/constant.config");
const orderDetailModel = require("./order-detail.model");

class OrderDetailService {
  transformToCartitem  ({ productDetail, quantity, loggedInUser }) {
    return {
      order: null,
      product: productDetail._id,
      buyer: loggedInUser._id,
      quantity,
      price: productDetail.afterDiscount,
      subTotal: productDetail.afterDiscount * quantity,
      total: productDetail.afterDiscount * quantity + 10000, //delivery charge Rs.100
      status: OREDR_STATUS.PENDING,
      seller: productDetail.seller?._id,
      createdBy: loggedInUser._id,
    };
  };

  getSingleRowByFilter = async (filter) => {
    try {
      const response = await orderDetailModel.findOne(filter);
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  
  addItemsToCart = async (cartItem) => {
    try {
      const response = new orderDetailModel(cartItem);
      return await response.save();
    } catch (exception) {
      throw exception;
    }
  };

  async removeFromCartByFilter(filter) {
    try {
      const response = await orderDetailModel.deleteOne(filter);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowByFilter(filter, query) {
    try {
      const page = +query.page || 1;
      const limit = +query.limit || 10;
      const skip = (page - 1) * limit;

      const data = await orderDetailModel
        .find(filter)
        .populate("order", [ "_id", "code", "subTotal", "total", "status", "isPaid"])
        .populate("buyer", [ "_id", "name", "email", "address",  "status", "role",  "image", "createdAt", "updatedAt", ])
        .populate("seller", [ "_id", "name", "email", "address", "image", "role", "status", "createdAt", "updatedAt", ])
        .populate("createdBy", [ "_id", "name", "status", "image", "email", "address", "phone", ])
        .populate("updatedBy", [ "_id", "name", "status", "image", "email", "address", "phone", ])
        .populate("product", [ "_id", "name", "slug", "afterDiscount", "discount", "category", "brand", "seller", "status", ])
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(skip);

      const totalCount = await orderDetailModel.countDocuments(filter);

      return {
        cart: data,
        pagination: {
          page: +page,
          limit: +limit,
          total: totalCount,
          totalPage: Math.ceil(totalCount / limit),
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  convertToOrder = async(order, cartInfo)=>{
    try{
      const updateInfo = [];
      cartInfo.map((item)=>{
        item.order = order._id;
        item.price = item.product.afterDiscount;
        item.subTotal = item.product.afterDiscount * item.quantity;
        item.total = item.subTotal + item.deliveryCharge;
        item.status = OREDR_STATUS.VERIFIED;


        updateInfo.push(item.save());

      })

      const responseStatus = await Promise.allSettled(updateInfo);

      let returnOrderDetails = [];
      responseStatus.forEach((item)=>{
        if(item.status === "fulfilled"){
          returnOrderDetails.push(item.value);
        }
      })
      return returnOrderDetails;
    }catch(exception){
      throw exception;
    }

  }

  reduceStock = async(cartInfo)=>{
    try{
      let products = [];
      cartInfo.map((item)=>{
        item.product.stock = item.product.stock - item.quantity
        products.push(item.product.save())

      })

      const response = await Promise.allSettled(products);
      let data = [];
      response.map((successResponse)=>{
        if(successResponse.status === "fulfilled"){
          data.push(successResponse.value)
        }
      })

      return data;
    }catch(exception){
      throw exception;
    }
  }
}

const orderDetailSvc = new OrderDetailService();
module.exports = orderDetailSvc;

const productSvc = require("../../product/product.service");
const orderDetailSvc = require("./order-detail.service");

class OrderDetailController {
  addToCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const loggedInUser = req.loggedInUser;
      const productDetail = await productSvc.getSingleRowByFilter({
        _id: productId,
      });

      if (!productDetail) {
        throw {
          code: 402,
          message: "Product not found",
          status: "PRODUCT_NOT_FOUND",
          options: null,
        };
      }

      const cartFilter = {
        order: { $eq: null },
        buyer: loggedInUser._id,
        product: productId,
      };

      const existingCart = await orderDetailSvc.getSingleRowByFilter(
        cartFilter
      );

      let currentCart = [];
      if (existingCart) {
        existingCart.quantity = +quantity + +existingCart.quantity;
        if (existingCart.quantity > productDetail.stock) {
          throw {
            code: 422,
            message: "Stock not available",
            status: "STOCK_NOT_AVAILABLE",
          };
        }
        existingCart.price = productDetail.afterDiscount;
        existingCart.subTotal =
          existingCart.quantity * productDetail.afterDiscount;
        existingCart.total =
          existingCart.subTotal + existingCart.deliveryCharge;

        currentCart = await existingCart.save();
      } else {
        if (productDetail.stock < quantity) {
          throw {
            code: 402,
            message: "Product stock is not sufficient",
            status: "PRODUCT_STOCK_NOT_SUFFICIENT",
          };
        }
        const cartItem = await orderDetailSvc.transformToCartitem({
          productDetail,
          quantity,
          loggedInUser,
        });

        currentCart = await orderDetailSvc.addToCart(cartItem);
      }

      res.json({
        data: currentCart,
        message: "Product successfully added to cart",
        status: "PRODUCT_ADDED_TO_CART",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  removeFromCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const loggedInUser = req.loggedInUser;

      const productDetail = await productSvc.getSingleRowByFilter({
        _id: productId,
      });
      if (!productDetail) {
        throw {
          code: 422,
          message: "Product not found",
          status: "PRODUCT_NOT_AVAILABLE",
        };
      }

      const cartFilter = {
        order: { $eq: null },
        product: productId,
        buyer: loggedInUser._id,
      };

      const existingCart = await productSvc.getSingleRowByFilter(cartFilter);

      let currentCart = null;

      if (!existingCart) {
        throw {
          code: 402,
          message: "Cart not available",
          status: "NO_ITEMS_IN_CART",
        };
      }

      if (existingCart.quantity < quantity) {
        throw {
          code: 422,
          message: "Quantity exceed than existing quantity",
          status: "QUANTITY_EXCEEDED",
        };
      }else if(+existingCart.quantity === +quantity || quantity === 0){
        currentCart = await orderDetailSvc.removeFromCartByFilter({
            _id: existingCart._id
        })
      }else{
        existingCart.quantity = +existingCart.quantity - +quantity;
        existingCart.price = productDetail.afterDiscount;
        existingCart.subTotal = productDetail.afterDiscount * existingCart,quantity;
        existingCart.total = existingCart.subTotal + existingCart.deliveryCharge;

        currentCart = await existingCart.save();
      };


      res.json({
        data: currentCart,
        message: "Remove items successfully",
        status: "ITEMS_REMOVED_SUCCESS",
        options: null
      })

    } catch (exception) {
      next(exception);
    }
  };


  viewMyCart = async(req, res, next)=>{
    try{
        const loggedInUser = req.loggedInUser;

        const cartFilter = {
            order: {$eq: null},
            buyer: loggedInUser._id
        };

        const {cart, pagination} = await orderDetailSvc.getAllRowByFilter(
            cartFilter,
            req.query
        );

        res.json({
            message: cart,
            message: "Cart listed success",
            status: "CART_LIST_FETCHED_SUCCESS",
            options: pagination
        })
    }catch(exception){
        next(exception);
    }
  }


  
}

const orderDetailCtrl = new OrderDetailController();
module.exports = orderDetailCtrl;

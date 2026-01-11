const productSvc = require("../../product/product.service");
const orderDetailSvc = require("./order-detail.service");

class OrderDetailController {
    addToCart = async(req, res, next)=>{
        try{
            const {productId, quantity} = req.body;
            const loggedInUser = req.loggedInUser
            const productDetail = await productSvc.getSingleRowByFilter({_id: productId});

            if(!productDetail){
                throw{
                    code: 402,
                    message: "Product not found",
                    status: "PRODUCT_NOT_FOUND",
                    options: null
                }
            };

            const cartFilter = {
                order: {$eq: null},
                buyer: loggedInUser._id,
                product: productId 
            };

            const existingCart = await orderDetailSvc.getSingleRowByFilter(cartFilter);

            let currentCart = [];
            if(existingCart){
                existingCart.quantity = +quantity + +existingCart.quantity;
                if(existingCart.quantity > productDetail.stock){
                    throw{
                        code: 422,
                        message: "Stock not available",
                        status: "STOCK_NOT_AVAILABLE"
                    }
                }
                existingCart.price = productDetail.price;
                existingCart.subTotal = existingCart.quantity * productDetail.price;
                existingCart.total = existingCart.subTotal + existingCart.deliveryCharge


                currentCart = await existingCart.save();

            }else{
                if(productDetail.stock < quantity){
                    throw{
                        code: 402,
                        message: "Product stock is not sufficient",
                        status: "PRODUCT_STOCK_NOT_SUFFICIENT"
                    }
                }
            }



        }catch(exception){
            next(exception);
        }
    }

}


const orderDetailCtrl = new OrderDetailController();
module.exports = orderDetailCtrl;
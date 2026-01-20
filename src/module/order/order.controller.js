const { OREDR_STATUS } = require("../../config/constant.config");
const { randomStringGenerator } = require("../../utilities/helper");
const orderDetailSvc = require("./detail/order-detail.service");
const orderSvc = require("./order.service");

class OrderController{
    async checkOut(req, res, next){
        try{
            let{cartId, applyVoucher} = req.body;
            const loggedInUser = req.loggedInUser;


            //to check unique cartId
            let newCartId = [];
            (new Set(cartId)).forEach(item=>newCartId.push(item));


            const {cart: cartInfo} = await orderDetailSvc.getAllRowByFilter({
                _id: {$in: cartId},
                buyer: loggedInUser._id,
                order: {$eq: null}
            }, {})

            if(!cartInfo){
                throw{
                    code: 422,
                    message: "Cart not found",
                    status: "CART_NOT_FOUND"
                }
            };

            const exists = [];
            let stockCheck = {};
            cartInfo.forEach((item, index)=> {
                if(newCartId.includes(item._id.toString())){
                    exists.push(item);
                }
                if(item.product.stock < item.quantity){
                    stockCheck[item._id.toString()] = "Stock less than quantity"
                }
            })

            if(Object.values(stockCheck).length > 0){
                throw{
                    code: 422,
                    message: stockCheck,
                    status: "OUT_OF_STOCK",
                }
            }

            if(exists.length !== newCartId.length){
                throw{
                    code: 422,
                    message: "Some cart items are not invalid",
                    status: "SOME_CART_ITEMS_INVALID"
                }
            };


            
            
            

            const appliedVoucherDetail = null;
            const totalValue = orderSvc.calculateTotal(cartInfo, appliedVoucherDetail);


            //order process mapping
           const orderDetail = await orderSvc.transformToOrder(loggedInUser, totalValue);

           //order to database
           const order = await orderSvc.createOrder(orderDetail);

           //orderDetail update
           await orderDetailSvc.convertToOrder(order, cartInfo);


           //stock update
           await orderDetailSvc.reduceStock(cartInfo);


        }catch(exception){
            next(exception);
        }
    }

}



const oredrCtrl = new OrderController();
module.exports = oredrCtrl;
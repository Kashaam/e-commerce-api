const {randomStringGenerator} = require('../../utilities/helper');
const {OREDR_STATUS} = require('../../config/constant.config');

class OrderService {
  calculateTotal(cartInfo, applyVoucherDetail) {
    let calculationValues = {
      grossTotal: 0,
      discounts: 0,
      deliveryCharge: 0,
      serviceCharge: 0,
      subTotal: 0,
      tax: 0,
      total: 0,
    };

    cartInfo.map((item) => {
      calculationValues.grossTotal += item.product.afterDiscount * item.quantity;
      calculationValues.deliveryCharge += item.deliveryCharge;
    });
    //discount is appplied only once
    calculationValues.discounts = applyVoucherDetail
      ? (calculationValues.grossTotal * applyVoucherDetail?.discount) / 100
      : 0;
    calculationValues.serviceCharge =
      (calculationValues.grossTotal -
        calculationValues.discounts +
        calculationValues.deliveryCharge) *
      0.1;
    calculationValues.subTotal =
      calculationValues.grossTotal +
      calculationValues.deliveryCharge -
      calculationValues.discounts +
      calculationValues.serviceCharge;
    calculationValues.tax = calculationValues.subTotal * 0.13;
    calculationValues.total =
      calculationValues.subTotal + calculationValues.tax;

    return calculationValues;
  }

  async transformToOrder(loggedInUser, calculationValues) {
    try {
      return {
        code: randomStringGenerator(10),
        buyer: loggedInUser._id,
        ...calculationValues,
        status: OREDR_STATUS.PENDING,
        isPaid: false,
        createdBy: loggedInUser._id,
      };
    } catch (exception) {
      throw exception;
    }
  }

  createOrder = async(data)=>{
    try{
        const response = new orderModel(data);
        return await response.save();
    }catch(exception){
        throw exception;
    }
  }
}

const orderSvc = new OrderService();
module.exports = orderSvc;

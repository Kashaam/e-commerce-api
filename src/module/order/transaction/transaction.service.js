const { Payment_Method, Payment_Status } = require("../../../config/constant.config");
const { randomStringGenerator } = require("../../../utilities/helper");
const transactionModel = require("./trasaction.model");

class TransactionService {
    transformToTransaction = (order)=>{
        return {
            order: order._id,
            transactionCode: randomStringGenerator(15),
            paymentMethod: Payment_Method.COD,
            amount: order.total,
            status: Payment_Status.PENDIND,
            response: null

        }
    }
    createTransaction = async(data)=>{
        try{
            const transactionObj = new transactionModel(data);
            return await transactionObj.save();
        }catch(exception){
            throw exception;
        }
    }
}



const transactionSvc = new TransactionService();
module.exports = transactionSvc;
const Joi = require('joi');


const AddToCartDTO = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).max(5).required()

});




module.exports = {
    AddToCartDTO
}
const Joi = require('joi');


const CheckOutDTO = Joi.object({
    cartId: Joi.array().items(Joi.string()).required(),
    applyVoucher: Joi.string().allow(null, "").default(null).optional()
})


module.exports ={
    CheckOutDTO
}
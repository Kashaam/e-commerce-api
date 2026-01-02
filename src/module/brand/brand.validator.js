const Joi = require('joi');
const { Status } = require('../../config/constant.config');

const BrandCreateDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    logo: Joi.string().allow(null, "").default(null),
    status: Joi.string().regex(/^(active|inactive)$/i).default(Status.INACTIVE),

});




module.exports = {
    BrandCreateDTO
}
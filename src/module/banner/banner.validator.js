const Joi = require('joi');
const { Status } = require('../../config/constant.config');



const CreateBannerDTO = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    link: Joi.string().uri().optional(),
    status: Joi.string().regex(/^active|inactive$/i).default(Status.INACTIVE),
    image: Joi.string().optional()
})
const UpdateBannerDTO = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    link: Joi.string().uri().optional(),
    status: Joi.string().regex(/^active|inactive$/i).default(Status.INACTIVE),
    image: Joi.string().optional()
})





module.exports = {
    CreateBannerDTO,
    UpdateBannerDTO
}
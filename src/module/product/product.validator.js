const Joi = require('joi')
const { Status } = require('../../config/constant.config')

const CreateProductDTO = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().required(),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(80).default(0).allow(null, '').optional(),
    category: Joi.array().items(Joi.string()).required(),
    brand: Joi.string().allow(null, "").default(null),
    images: Joi.string().allow(null, "").optional().default(null),
    sku: Joi.string().allow(null, "").default(null).optional(),
    attributes: Joi.array().items(Joi.object({
        key: Joi.string().required(),
        value: Joi.array().items(Joi.string()).required()
    })).allow(null, "").default(null).optional(),
    stock: Joi.number().min(0).allow(null, "").optional().default(null),
    status: Joi.string().regex(/^(active|inactive)$/i).default(Status.INACTIVE),
    tag: Joi.array().items(Joi.string()).allow(null, "").optional().default(null),
    homeFeature: Joi.boolean().default(null)
})


const UpdateProductDTO = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().required(),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(80).default(0).allow(null, '').optional(),
    category: Joi.array().items(Joi.string()).required(),
    brand: Joi.string().allow(null, "").default(null),
    images: Joi.string().allow(null, "").optional().default(null),
    sku: Joi.string().allow(null, "").default(null).optional(),
    attributes: Joi.array().items(Joi.object({
        key: Joi.string().required(),
        value: Joi.array().items(Joi.string()).required()
    })).allow(null, "").default(null).optional(),
    stock: Joi.number().min(0).allow(null, "").optional().default(null),
    status: Joi.string().regex(/^(active|inactive)$/i).default(Status.INACTIVE),
    tag: Joi.array().items(Joi.string()).allow(null, "").optional().default(null),
    homeFeature: Joi.boolean().default(null)
})


module.exports = {
    CreateProductDTO,
    UpdateProductDTO
}
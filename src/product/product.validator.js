const Joi = require('joi')

const CreateProductDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().required(),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(80).default(0).allow(null, '').optional(),
    category: Joi.array().items(Joi.string()).required(),
    brand: Joi.array().items(Joi.string().allow(null, "").optional().default(null)).allow(null, "").default(null),
    image: Joi.string().allow(null, "").optional().default(null),
    sku: Joi.string().allow(null, "").default(null).optional(),
    attributes: Joi.object({
        key: Joi.string(),
        value: Joi.array().items(Joi.string())
    }).allow(null, "").default(null).optional(),
    stock: Joi.number().min(0).allow(null, "").optional().default(null),
    tag: Joi.array().items(Joi.string()).allow(null, "").optional().default(null),
    homeFeature: Joi.boolean().default(null)
})


const UpdateProductDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().required(),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(80).default(0).allow(null, '').optional(),
    category: Joi.array().items(Joi.string()).required(),
    brand: Joi.array().items(Joi.string().allow(null, "").optional().default(null)).allow(null, "").default(null),
    image: Joi.string().allow(null, "").optional().default(null),
    sku: Joi.string().allow(null, "").default(null).optional(),
    attributes: Joi.object({
        key: Joi.string(),
        value: Joi.array().items(Joi.string())
    }).allow(null, "").default(null).optional(),
    stock: Joi.number().min(0).allow(null, "").optional().default(null),
    tag: Joi.array().items(Joi.string()).allow(null, "").optional().default(null),
    homeFeature: Joi.boolean().default(null)
})


module.exports = {
    CreateProductDTO,
    UpdateProductDTO
}


const Joi = require('joi');
const { Status } = require('../../config/constant.config');


const CategoryCreateDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    parentId: Joi.string().allow(null, "").default(null),
    brand: Joi.array().items(Joi.string().allow(null, "").default(null)).allow(null, "").default(null),
    status: Joi.string().regex(/^active|inactive$/i).default(Status.INACTIVE),
    homeFeature: Joi.boolean().default(false),
    showInMenu: Joi.boolean().default(false),
    icon: Joi.string().allow(null, "").default(null)
});

const UpdateCategoryDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    parentId: Joi.string().allow(null, "").default(null),
    brand: Joi.array().items(Joi.string().allow(null, "").default(null)).allow(null, "").default(null),
    status: Joi.string().regex(/^active|inactive$/i).default(Status.INACTIVE),
    homeFeature: Joi.boolean().default(false),
    showInMenu: Joi.boolean().default(false),
    icon: Joi.string().allow(null, "").default(null)
});

module.exports = {
    CategoryCreateDTO,
    UpdateCategoryDTO
}
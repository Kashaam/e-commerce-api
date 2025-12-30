const Joi = require("joi");
const EmailDTO = Joi.string().email().required();
const PasswordDTO = Joi.string().required();

const RegisterDTO = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: EmailDTO,
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&+<>?*`@]).{8,25}/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-25 characters long, include at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not matched with password",
  }),
  gender: Joi.string()
    .regex(/^male|female|other$/i)
    .optional(),
  address: Joi.object({
    billingAddress: Joi.string().max(100),
    shippingAddress: Joi.string().max(100),
  })
    .allow(null, "")
    .default(null),
  phone: Joi.string()
    .regex(/^(?:\+?977[-\s]?|0)?(?:9\d{9}|1\d{7}|[2-7]\d{6,7})$/)
    .allow(null, "")
    .default(null),
  image: Joi.string().allow(null, "").optional().default(null),
  role: Joi.string().regex(/^admin|customer|seller$/i),
});

const LoginDTO = Joi.object({
  email: EmailDTO,
  password: PasswordDTO,
});

const ResetPasswordRequestDTO = Joi.object({
  email: EmailDTO,
});

const ResetPasswordDTO = Joi.object({
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&+<>?*`@]).{8,25}/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-25 characters long, include at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not matched with password",
  }) 
});

module.exports = {
  RegisterDTO,
  EmailDTO,
  LoginDTO,
  ResetPasswordRequestDTO,
  ResetPasswordDTO
};

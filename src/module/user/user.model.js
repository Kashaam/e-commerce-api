const mongoose = require("mongoose");
const { Status, Roles } = require("../../config/constant.config");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.CUSTOMER,
    },
    gender: {
      type: String,
      default: null,
    },
    image: {
      publicId: String,
      secureUrl: String,
      optimizedUrl: String
    },
    phone: [{ type: String, default: null }],
    activationToken: String
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;

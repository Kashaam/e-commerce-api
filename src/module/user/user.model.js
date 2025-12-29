const mongoose = require("mongoose");
const { Status, Roles, Gender } = require("../../config/constant.config");

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
      enum: Object.values(Gender),
      default: null,
    },
    address: {
      billingAddress: String,
      shippingAddress: String
    },
    image: {
      publicId: String,
      secureUrl: String,
      optimizedUrl: String
    },
    phone: [{ type: String, default: null }],
    activationToken: String,
    forgetPasswordToken: String,
    expiryTime: Date,
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createddBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;

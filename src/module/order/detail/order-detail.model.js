const mongoose = require("mongoose");
const { OREDR_STATUS } = require("../../../config/constant.config");

const OrderDetailSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
      min: 10000,
    },
    status: {
      type: String,
      enum: Object.values(OREDR_STATUS),
      default: OREDR_STATUS.PENDING,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);



const orderDetailModel = mongoose.model("OrderDetail", OrderDetailSchema);
module.exports = orderDetailModel;
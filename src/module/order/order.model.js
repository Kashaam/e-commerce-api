const { default: mongoose } = require("mongoose");
const { OREDR_STATUS } = require("../../config/constant.config");

const OrderSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
      required: true,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    grossTotal: {
      type: Number,
      required: true,
    },
    dicsounts: {
      type: Number,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      optional: true,
      default: true,
    },
    serviceCharge: {
      type: Number,
      optional: true,
      default: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: Number,
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: string,
      enum: Object.values(OREDR_STATUS),
      default: OREDR_STATUS.PENDING,
    },
    isPaid: Boolean,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);


const orderModel = mongoose.model('Order', OrderSchema);
module.exports = orderModel;
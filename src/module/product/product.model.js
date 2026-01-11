const mongoose = require("mongoose");
const { Status } = require("../../config/constant.config");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 200,
      required: true,
    },
    price: {
      //price always in paisa like I have mentioned min Rs.100
      type: Number,
      required: true,
      min: 1000,
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
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 80,
    },
    afterDiscount: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],

    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    tag: [String],
    sku: String,
    homeFeature: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    stock: {
      type: Number,
      min: 0,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attributes: [
      {
        key: String,
        value: [String],
      },
    ],
    images: [
      {
        publicId: String,
        secureUrl: String,
        optimizedUrl: String,
      },
    ],
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const productModel = mongoose.model("Product", ProductSchema);
module.exports = productModel;

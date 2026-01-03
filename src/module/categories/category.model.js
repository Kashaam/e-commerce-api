const mongoose = require("mongoose");
const { Status } = require("../../config/constant.config");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 100,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brand: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: null,
      },
    ],

    showInMenu: {
      type: Boolean,
      default: false,
    },
    homeFeature: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    icon: {
      publicId: String,
      optimizedUrl: String,
      secureUrl: String,
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
    autoCreate: true,
    autoIndex: true,
  }
);

const categoryModel = mongoose.model("Category", CategorySchema, "categories");
module.exports = categoryModel;

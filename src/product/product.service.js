const slugify = require("slugify");
const cloudinarySvc = require("../services/cloudinary.service");
const { randomStringGenerator } = require("../utilities/helper");
const BaseService = require("../services/base.service");
const productModel = require("./product.model");
const categorySvc = require("../module/categories/category.service");
const userSvc = require("../module/user/user.service");

class ProductService extends BaseService {
  async transformCreateProduct(req) {
    try {
      const data = req.body;
      data.createdBy = req.loggedInUser._id;

      // multiple image handling
      if (req.files) {
        let images = [];
        data.images = [];
        req.files.map((image) => {
          let uploadResponse = cloudinarySvc.fileUpload(
            image.path,
            "/product/"
          );
          images.push(uploadResponse);
        });

        const uploadStatus = await Promise.allSettled(images);

        uploadStatus.map((cloudinaryUploadSuccess) => {
          if (cloudinaryUploadSuccess.status === "fulfilled") {
            data.images.push(cloudinaryUploadSuccess.value);
          }
        });
      }

      data.slug = slugify(
        data.name.replace("+", "-").replace("'", "").replace('"', "") +
          "-" +
          randomStringGenerator(7),
        {
          lower: true,
        }
      );

      //rupee => paisa in database
      data.price = data.price * 100;

      data.afterDiscount = data.price - (data.price * data.discount) / 100;
      data.seller = req.loggedInUser._id;

      if (data.category === null || data.category === "") {
        data.category = null;
      }

      if (data.brand === null || data.brand === "") {
        data.brand = null;
      }

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  publicProductData = (product) => {
    return {
      _id: product?._id,
      name: product?.name,
      status: product?.status,
      slug: product?.slug,
      description: product?.description,
      price: product?.price,
      discount: product?.discount,
      afterDiscount: product?.afterDiscount,
      tag: product.tag,
      stock: product.stock,
      attributes: product.attributes,
      sku: product.sku,
      homeFeature: product.homeFeature,
      seller: product.seller && userSvc.publicUserProfile,
      category:
        product.category &&
        product.category.map((cat) => categorySvc.publicCategoryData(cat)),
      brand: product.brand && brandSvc.publicBrandData(product.brand),
      images: product.images.map((image) => {
        image?.optimizedUrl;
      }),
      createdBy: product.createdBy,
      updatedBy: product.updatedBy,
    };
  };

  listAllProducts = async (query, filter = {}) => {
    try {
      const page = +query.page || 1;
      const skip = +query.skip || 10;
      const limit = (page - 1) * skip;

      const data = await this.model
        .find(filter)
        .populate("brand", ["_id", "name", "status", "slug", "logo"])
        .populate("category", ["_id", "name", "status", "slug", "icon"])
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "status",
          "image",
          "role",
        ])
        .populate("seller", ["_id", "name", "email", "status", "image", "role"])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "status",
          "image",
          "role",
        ])
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(skip);

      const count = await this.model.countDocuments(filter);

      return {
        data: data.map(this.publicProductData),
        pagination: {
          current: page,
          limit: limit,
          total: count,
          totalPage: Math.ceil(count / limit),
        },
      };
    } catch (exception) {
      throw exception;
    }
  };

  transformUpdateProduct = async (req, oldData) => {
    try {
      const data = req.body;
      data.updatedBy = req.loggedInUser_id;

      if (data.files) {
        let images = [];
        data.images = [...oldData.images];

        data.files.map((image) => {
          let response = cloudinarySvc.fileUpload(image.path, "/product");
          images.push(response);
        });

        const statusResponse = await Promise.allSettled(images);

        statusResponse.map((cloudinarySuccess) => {
          if (cloudinarySuccess.status === "fulfilled") {
            data.images.push(cloudinarySuccess.value);
          }
        });
      }

      data.price = data.price * 100;
      data.afterDiscount = data.price - (data.price * data.discount) / 100;
      if (data.category === null || data.category === "") {
        data.category = null;
      }
      if (data.brand === null || data.brand === "") {
        data.brand = null;
      }

      return data;
    } catch (exception) {
      throw exception;
    }
  };
}

const productSvc = new ProductService(productModel);
module.exports = productSvc;

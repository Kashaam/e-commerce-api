const { default: slugify } = require("slugify");
const BaseService = require("../../services/base.service");
const cloudinarySvc = require("../../services/cloudinary.service");
const brandModel = require("./brand.model");

class BrandService extends BaseService {
  transformCreateBrand = async (req) => {
    try {
      const data = req.body;
      data.createdBy = req.loggedInUser._id;

      if (req.file) {
        data.logo = await cloudinarySvc.fileUpload(req.file.path, "/brand");
      }
      // slug (kunai pani string ma special character xa vaney replace garney and replace whitespace too in lowercase)

      data.slug = slugify(data.name.replace("'", "").replace('"', ""), {
        lower: true,
      });
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  publicBrandData(brand) {
    return {
      _id: brand._id,
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo.optimizedUrl,
      createdBy: {
        _id: brand?.createdBy?._id,
        name: brand?.createdBy?.name,
        email: brand?.createdBy?.email,
        status: brand?.createdBy?.status,
        image: brand?.createdBy?.image?.optimizedUrl,
      },
    };
  }

  async listAllRowsByFilter(query, filter = {}) {
    try {
      const page = +query.page || 1;
      const limit = +query.limit || 10;
      const skip = (page - 1) * limit;

      const data = await this.model
        .find(filter)
        .populate("createdBy", [ "_id", "name", "email", "image", "role", "status", "gender", "address",])
        .populate("updatedBy", [ "_id", "name", "email", "image", "role", "status", "gender", "address",])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);

      const totalCount = await this.model.countDocuments(filter);

      return {
        data: data.map(this.publicBrandData),
        pagination: {
          current: page,
          limit: limit,
          skip: skip,
          total: totalCount,
          total_page: Math.ceil(totalCount / limit),
        },
      };
    } catch (exception) {
      throw exception;
    }
  }
}

const brandSvc = new BrandService(brandModel);
module.exports = brandSvc;

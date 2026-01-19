const cloudinarySvc = require("../../services/cloudinary.service");
const BannerModel = require("./banner.model");

class BannnerService {
  async transformCreateBanner(req) {
    try {
      const data = req.body;

      if (req.file) {
        data.image = await cloudinarySvc.fileUpload(req.file.path, "/banner/");
      }

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  createBanner(data) {
    try {
      const banner = new BannerModel.create(data);
      return banner;
    } catch (exception) {
      throw exception;
    }
  }

  publicBannerData(data) {
    return {
      _id: data.id,
      title: data.title,
      image: data.image?.optimizedUrl,
      status: data.status,
    };
  }

  async listAll(filter, query) {
    try {
      const page = +req.page || 1;
      const limit = +req.limit || 10;
      const skip = (page - 1) * limit;

      const { rows: data, count: total } = await BannerModel.findAndCountAll({
        where: filter,
        order: [["createdAt", "desc"]],
        offset: skip,
      });

      return {
        data: data.map((banner) => this.publicBannerData(banner)),
        pagination: {
          current: page,
          limit: limit,
          skip: skip,
          total: total,
          totalPage: Math.ceil(total / limit),
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async getBannerById(filter) {
    try {
      const response = await BannerModel.findOne({
        where: filter,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteBanner(filter) {
    try {
      const response = await BannerModel.destroy({
        where: filter,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  async transformUpdateBanner(req, oldData){
    try{
        const data = req.body;

        if(req.file){
            data.image = await cloudinarySvc.fileUpload(req.file.path, "/banner/");
        }else{
            data.image = oldData.image;
        };

        return data;
    }catch(exception){
        throw exception;
    }
  }

  async updateByFilter(filter, data){
    try{
        const [count, rows] = await BannerModel.update(data, {
            where: filter,
            returning: ["_id", "title", "image", "status", "createdAt", "updatedAt"]
        })
        if(!count) return null;
        return rows[0];
    }catch(exception){
        throw exception;
    }
  }
}

const bannerSvc = new BannnerService();
module.exports = bannerSvc;

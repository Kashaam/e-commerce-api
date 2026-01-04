const BaseService = require("../../services/base.service");
const cloudinarySvc = require("../../services/cloudinary.service");
const categoryModel = require("./category.model");
const slugify = require('slugify');

class CategoryService extends BaseService {
  async transformCreateCategory(req) {
    try {
      const data = req.body;
      data.createdBy = req.loggedInUser;
      if (req.file) {
        data.icon = await cloudinarySvc.fileUpload(req.file.path, "category");
      }

      if(data.parentId === "" || data.parentId === null){
        data.parentId = null
      };

      if(data.brand === "" || data.brand === null){
        data.brand = null
      }

      data.slug = slugify(data.name.replace('"', "").replace("'", ""));

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  publicCategoryData(cat){
    return {
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon.optimizedUrl,
      createdBy: {
        _id: cat?.createdBy?._id,
        name: cat?.createdBy?.name,
        email: cat?.createdBy?.email,
        status: cat?.createdBy?.status,
        image: cat?.createdBy?.image?.optimizedUrl,
      },
      parentId: {
        _id: cat?.parentId?._id,
        name: cat?.parentId?.name,
        status: cat?.parentId?.status,
        slug: cat?.parentId?.slug,
        icon: cat?.parentId?.icon?.optimizedUrl,
      },
      brand: cat?.brand?.map((row)=>{         //since brand might be multiple
        return {
            _id: row?._id,
            name: row?.name,
            slug: row?.slug,
            logo: row?.logo.optimizedUrl,
            status: row?.status
        }
      })
    };
  }

  async listAll(query, filter={}){
    try{
        const page = +query.page || 1;
        const limit = +query.limit || 10;
        const skip = (page-1) * limit;


        const data = await this.model
                    .find(filter)
                    .populate("brand", ["_id", "name", "logo", "slug", "status"])
                    .populate("parentId", ["_id", "name", "icon", "slug", "status"])
                    .populate("createdBy", [ "_id", "name", "email", "image", "role", "status", "gender", "address",])
                    .populate("updatedBy", [ "_id", "name", "email", "image", "role", "status", "gender", "address",])
                    .sort({ createdAt: "desc" })
                    .skip(skip)
                    .limit(limit);



        const totalCount = await this.model.countDocuments(filter);

        return {
        data: data.map(this.publicCategoryData),
        pagination: {
          current: page,
          limit: limit,
          skip: skip,
          total: totalCount,
          total_page: Math.ceil(totalCount / limit),
        },
      };
    }catch(exception){
        throw exception;
    }
  }

  transformUpdateCategory = async(req, oldData)=>{
    try{
        const data = req.data;
        data.updatedBy = req.loggedInUser;
        if(req.file){
            data.icon = await cloudinarySvc.fileUpload(req.file.path, '/category/')
        }else{
            data.icon = oldData.icon
        };

        if(data.brand=== null || data.brand === ""){
            data.brand = null
        }

        if(data.parentId=== null || data.parentId === ""){
            data.parentId = null
        }

        return data;
    }catch(exception){
        throw exception;
    }
  }
}

const categorySvc = new CategoryService(categoryModel);
module.exports = categorySvc;

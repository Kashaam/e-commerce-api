const { default: slugify } = require("slugify");
const BaseService = require("../../services/base.service");
const cloudinarySvc = require("../../services/cloudinary.service");
const brandModel = require("./brand.model");

class BrandService extends BaseService {
    transformCreateBrand = async(req) =>{
        try{
            const data = req.body;
            data.createdBy = req.loggedInUser._id;

            if(req.file){
                data.logo = await cloudinarySvc.fileUpload(req.file.path, "/brand");

                
            }
            // slug (kunai pani string ma special character xa vaney replace garney and replace whitespace too in lowercase)

            data.slug = slugify(data.name.replace("'", "").replace('"', ""), {
                lower: true
            });


            return data;

        }catch(exception){
            throw exception;
        }
    }
}

const brandSvc = new BrandService(brandModel);
module.exports = brandSvc;
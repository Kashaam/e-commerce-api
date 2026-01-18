const cloudinarySvc = require("../../services/cloudinary.service");
const BannerModel = require("./banner.model");

class BannnerService {
    async transformCreateBanner(req){
        try{
            const data = req.body;

            if(req.file){
                data.image = await cloudinarySvc.fileUpload(req.file.path, "/banner/");
            }

            return data;
        }catch(exception){
            throw exception;
        }
    }

    createBanner(data){
        try{
            const banner = new BannerModel(data);
            
        }catch(exception){
            throw exception;
        }
    }
}


const bannerSvc = new BannnerService();
module.exports = bannerSvc;
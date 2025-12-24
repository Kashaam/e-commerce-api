const { AppConfig } = require('../config/config');
const cloudinary = require('cloudinary').v2;



class CloudinaryService {
    constructor(){
            cloudinary.config({
                cloud_name:  AppConfig.cloud_name,
                api_key: AppConfig.api_key,
                api_secret: AppConfig.api_secret
            })
    }


    fileUpload = async(filepath, dir='/')=>{
        try{
            const {public_id, secure_url}= await cloudinary.uploader.upload(filepath, {
                unique_filename: true,
                folder: "daraz-api"+dir,
                resource_type: "auto"
            });


            const optimized_url = cloudinary.url(public_id, {
                transformation: [
                    {width: 500, crop: "fill"},
                    {quality: "auto", fetch_format: "auto"}
                ]
            })
            return {
                publicId: public_id,
                secureUrl: secure_url,
                optimizedUrl: optimized_url
            }
        }catch(exception){
            console.log("Exception in cloudinary..",exception)
            throw{
                code: 500,
                message: "File upload error in cloudinary..",
                status: "FILE_UPLOAD_ERROR"
            }
        }
    }
}



const cloudinarySvc = new CloudinaryService();
module.exports = cloudinarySvc;
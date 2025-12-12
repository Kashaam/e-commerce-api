const multer = require('multer');
const fs = require('fs');
const randomStringGenerator = require('../utilities/helper');


const myStorage = multer.diskStorage({
    destination: function(req, file, cb){
        const filepath = "./public/uploads";
        if(!fs.existsSync(filepath)){
            fs.mkdirSync(filepath, {recursive: true});
        }
        cb(null, filepath);
    },

    filename: function(req, file, cb){
        const filename =randomStringGenerator(15)+ "-" + file.originalname;

        cb(null, filename);
    }
})


const uploader = (type = "image")=>{
    const uploadConfig = {
        fileSize: 3000000,
        fileFilter: function(req, file, cb){
            let allowedExt = ["jpeg", "png", "gif", "img"];
            if(type === "doc"){
                this.fileSize = 5000000;
                allowedExt = ["doc", "pdf", "docx", "csv", "json"]
            } else if (type === "audio"){
                this.fileSize = 7000000;
                allowedExt = ["m3u8", "mp3"];
            }

            let ext = file.originalname.split('.').pop();
            if(allowedExt.includes(ext.toLowerCase())){
                cb(null, true);
            } else{
                cb({
                    code: 402,
                    message: "Invalid extension",
                    status: "INVALID_FILE_FORMAT"
                })
            }
        }
    }

    return multer({
        storage: myStorage,
        limits: {
            fileSize: uploadConfig.fileSize
        },
        fileFilter: uploadConfig.fileFilter
    })
}

module.exports = uploader;
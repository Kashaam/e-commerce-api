const brandSvc = require("./brand.service");

class BrandController {
    createBrand = async(req, res, next)=>{
        try{
            const payload = await brandSvc.transformCreateBrand(req);
            const brand = await brandSvc.create(payload);


            res.json({
                data: brand,
                message: "Brand created successfully",
                status: "SUCCESS_CREATE",
                options: null
            })
        }catch(exception){
            next(exception);
        }
    }

    

}

const brandCtrl = new BrandController();
module.exports = brandCtrl;
class CategoryController {
    createCategory = async(req, res, next)=>{
        try{

        }catch(exception){
            next(exception);
        }
    }

}


const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;
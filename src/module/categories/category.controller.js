const categorySvc = require("./category.service");

class CategoryController {
  createCategory = async (req, res, next) => {
    try {
      const data = await categorySvc.transformCreateCategory(req);
      const categoryStore = await categorySvc.create(data);

      res.json({
        data: categoryStore,
        message: "Catergory created successfully",
        status: "CATEGORY_CREATED_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllCategory = async (req, res, next)=>{
    try{
        let filter = {};
        if(req.query.search){
            filter = {
                ...filter,
                name: new RegExp(req.query.search, "i")
            }
        }

        if(req.query.status){
            filter = {
                ...filter,
                status: req.query.status
            }
        }

        const {data, pagination} = await categorySvc.listAll(req.query, filter);
        res.json({
            data: data,
            message: "Category listed successfully",
            status: "CATEGORY_LISTED_SUCCESS",
            options: pagination
        })
    }catch(exception){
        next(exception);
    }
  }
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;

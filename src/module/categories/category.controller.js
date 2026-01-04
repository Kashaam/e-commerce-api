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

  listAllCategory = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.search) {
        filter = {
          ...filter,
          name: new RegExp(req.query.search, { $options: "i" }),
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      if (+req.query.showInMenu === 1) {
        filter = {
          ...filter,
          showInMenu: true,
        };
      } else if (+req.query.showInMenu === 0) {
        filter = {
          ...filter,
          showInMenu: false,
        };
      }

      if (+req.query.homeFeature === 1) {
        filter = {
          ...filter,
          homeFeature: true,
        };
      } else if (+req.query.homeFeature === 0) {
        filter = {
          ...filter,
          homeFeature: false,
        };
      }

      const { data, pagination } = await categorySvc.listAll(req.query, filter);
      res.json({
        data: data,
        message: "Category listed successfully",
        status: "CATEGORY_LISTED_SUCCESS",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      const category = await categorySvc.getSingleRowByFilter({
        _id: req.params.categoryId,
      });

      if (!category) {
        throw {
          code: 402,
          message: "Category not found",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      const payload = await categorySvc.transformUpdateCategory(req, category);
      const updateData = await categorySvc.updateSingleRowByFilter(
        { _id: category._id },
        payload
      );

      res.json({
        data: updateData,
        message: "Category updated successfully",
        status: "CATEGORY_UPDATED_SUCCESSFULLY",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getCategoryById = async (req, res, next) => {
    try {
      const category = await categorySvc.getSingleRowByFilter({
        _id: req.params.categoryId,
      });

      if (!category) {
        throw {
          code: 402,
          message: "Category not found",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      res.json({
        data: category,
        message: "Category successfully fetched",
        status: "CATEGORY_DATA_FETCHED_BY_ID",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  async removeCategory(req, res, next) {
    try {
      const data = await categorySvc.getSingleRowByFilter({
        _id: req.params.categoryId,
      });
      if (!data) {
        throw {
          code: 402,
          message: "Category not found",
          status: "CATEGORY_NPT_FOUND",
          options: null,
        };
      }

      const deleteData = await categorySvc.deleteSingleRowByFilter({
        _id: data._id,
      });

      res.json({
        data: deleteData,
        message: "Data deleted successfully",
        status: "CATEGORY_DELETED_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;

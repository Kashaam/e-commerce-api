const userModel = require("./user.model");

class UserService {
  publicUserProfile = (user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
      gender: user.gender,
      image: user.image,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy,
      createdBy: user.createdBy,
    };
  };

  getSingleUserByFilter = async (filter) => {
    try {
      const response = await userModel.findOne(filter);
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  updateSingleUserByFilter = async(filter, data)=>{
    try{
        const response = await userModel.findOneAndUpdate(filter, {$set: data}, {new: true});
        return response;
    }catch(exception){
        throw exception;
    }
  }

  getAllUser = async(filter, query)=>{
    try{
      const page = +query.page || 1;
      const limit = +query.limit || 10;
      const skip = (page -1) * limit;


      const data = await userModel.find(filter)
                  .sort({name: "desc"})
                  .skip(skip)
                  .limit(limit)

      const countTotal = await userModel.countDocuments(filter);

      return{
        data: data.map((singleDetail)=>{return this.publicUserProfile(singleDetail)}),
        pagination: {
          current: page,
          limit: limit,
          total: countTotal,
          totalPage: Math.ceil(countTotal/limit)
        }
      }
    }catch(exception){
      throw(exception);
    }
  }

}

const userSvc = new UserService();
module.exports = userSvc;

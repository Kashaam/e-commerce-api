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

}

const userSvc = new UserService();
module.exports = userSvc;

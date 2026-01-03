class BaseService {
    constructor(model){
        this.model = model;
    }
    async create(data){
        try{
            const response = new this.model(data);
            return await response.save();
        }catch(exception){
            throw exception;
        }
    }

    async getSingleRowByFilter(filter){
    try{
        const response = await this.model
                        .findOne(filter)
                        .populate("createdBy", [ "_id", "name", "email", "image", "role", "status", "gender", "address",])
                        .populate("updatedBy", [ "_id", "name", "email", "image", "role", "status", "gender", "address",])
         return response;             
    }catch(exception){
      throw(exception)
    }
  }

  async updateSingleRowByFilter(filter, data){
    try{
        const response =  this.model.findOneAndUpdate(filter, {$set: data}, {new: true});
        return response;
    }catch(exception){
        throw exception;
    }
  }

  async deleteSingleRowByFilter(filter){
    try{
        const response = await this.model.findOneAndDelete(filter);
        return response;
    }catch(exception){
        throw exception;
    }
  }
}

module.exports = BaseService;
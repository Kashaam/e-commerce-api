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

    async list(data){
        try{

        }catch(exception){
            throw exception;
        }
    }
}

module.exports = BaseService;
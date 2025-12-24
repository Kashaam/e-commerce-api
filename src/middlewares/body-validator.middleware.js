const bodyValidator = (schema) =>{
    return async(req, res, next)=>{
        try{
            const data = req.body;
            if(!data){
                next({
                    code: 404,
                    message: "Empty payload",
                    status: "EMPTY_PAYLOAD"
                })
            }


            await schema.validateAsync(data, {abortEarly: false});
            next();
        }catch(exception){
            let messageBag = {};
            if(exception.details && Array.isArray(exception.details)){
                exception.details.map((err)=>{
                let key = err.path.pop();
                messageBag[key] = err.message;
            })
            }
            next({
                code: 422,
                message: "Validation error",
                status: "VALIDATION_ERROR",
                detail: messageBag
            });
        }
    }
}


module.exports = bodyValidator;
const userSvc = require("./user.service");

class UserController{
    listAllUser = async(req, res, next)=>{
        try{
            const loggedInUser = req.loggedInUser;
            let filter = {
                _id: {$ne: loggedInUser._id}
            };

            if(req.query.search){
                filter = {
                    ...filter,
                    $or: [
                        {name: new RegExp(req.query.search, 'i')},
                        {email: new RegExp(req.query.search, 'i')},
                        {gender: new RegExp(req.query.search, 'i')},
                        {phone: new RegExp(req.query.search, 'i')},
                        {"address.billingAddress": new RegExp(req.query.search, 'i')},
                        {"address.shippingAddress": new RegExp(req.query.search, 'i')}
                    ]
                }
            }

           if(req.query.role){
             filter = {
                ...filter,
                role: req.query.role
            }
           }


            const {data, pagination} = await userSvc.getAllUser(filter, req.query);

            res.json({
                data: data,
                message: "User listed ",
                status: "USER_LISTED_SUCCESS",
                options: pagination
            })
        }catch(exception){
            next(exception)
        }
    }
}


const userCtrl = new UserController();
module.exports = userCtrl;
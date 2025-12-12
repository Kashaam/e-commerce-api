const authSvc = require("./auth.service");

class AuthController {
    register = async(req, res, next)=>{
        try{
            const reqData = req.body;
            await authSvc.sendUserRegisterNotification(reqData);
            res.json({
                data: reqData,
                message: "User registered successfully",
                status: "USER_REgISteReD_SUCCESS"
            })
        }catch(exception){
            next(exception);
        }
    }

}

const authCtrl = new AuthController();
module.exports = authCtrl;
const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constant.config");
const userSvc = require("../user/user.service");
const authSvc = require("./auth.service");
const bcrypt = require('bcryptjs');

class AuthController {
    register = async(req, res, next)=>{
        try{
            const reqData = await authSvc.createTransformUser(req);
            // const userData = await authSvc.createUser(reqData);
            await authSvc.sendUserRegisterNotification(reqData);
            res.json({
                data: userSvc.publicUserProfile(reqData),
                message: "User registered successfully",
                status: "USER_REgISteReD_SUCCESS"
            })
        }catch(exception){
            next(exception);
        }
    }


    activateUser = async(req, res, next)=>{
        try{
            const token = req.params.token;
            const userDetails = await userSvc.getSingleUserByFilter({
                activationToken: token
            });

            if(!userDetails){
                throw({
                    code: 404,
                    message: "User not found or registered",
                    status: "USER_NOT_FOUND_OR_REGISTERED",
                })
            }

            const updateUser = await userSvc.updateSingleUserByFilter({
                _id: userDetails._id
            }, {
                status: Status.ACTIVE,
                activationToken: null
            });


            await authSvc.newUserWelcomeEmail(updateUser);
            res.json({
                data: null,
                message: "User activated successfully",
                status: "USER_ACTIVATED_SUCCESS",
                options: null
            })
        }catch(exception){
            next(exception);
        }
    }

    login = async(req, res, next)=>{
        try{
            const {email, password} = req.body;
            const userDetail = await userSvc.getSingleUserByFilter({
                email: email
            });

            if(!userDetail){
                throw({
                    code: 401,
                    message: "User not registered or activated yet",
                    status: "USER_NOT_REGISTERED_OR_ACTIVATED"
                })
            }

            if(!bcrypt.compareSync(password, userDetail.password)){
                throw({
                    code: 403,
                    message:"Invalid credentials",
                    status: "INVALID_PASSWORD"
                })
            };

            // const refreshToken= jwt.sign({
            //     typ: "Refresh",
            //     sub: userDetail._id
            // }, )
           
        }catch(exception){
            next(exception);
        }
    }

}

const authCtrl = new AuthController();
module.exports = authCtrl;
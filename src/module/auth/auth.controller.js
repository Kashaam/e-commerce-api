const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constant.config");
const { randomStringGenerator } = require("../../utilities/helper");
const userSvc = require("../user/user.service");
const authSvc = require("./auth.service");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    register = async(req, res, next)=>{
        try{
            const reqData = await authSvc.createTransformUser(req);
            const userData = await authSvc.createUser(reqData);
            await authSvc.sendUserRegisterNotification(userData);
            res.json({
                data: userSvc.publicUserProfile(userData),
                message: "User registered successfully",
                status: "USER_REGISTERED_SUCCESS"
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

            if( userDetail.status !== Status.ACTIVE || userDetail.activationToken !== null){
                throw({
                    code: 422,
                    message: "User not activated yet",
                    status: "USER_NOT_ACTIVATED_YET"
                })
            }

            const refreshToken= jwt.sign({
                typ: "Refresh",
                sub: userDetail._id
            }, AppConfig.jwt_secret, {
                expiresIn: "3d"
            } );


            const accessToken = jwt.sign({
                typ: "Bearer",
                sub: userDetail._id
            }, AppConfig.jwt_secret, {
                expiresIn: "3h"
            });

            const maskedRefreshToken = randomStringGenerator(150);
            const maskedAccessToken = randomStringGenerator(150);

            const authData = {
                user: userDetail._id,
                maskedRefreshToken: maskedRefreshToken,
                maskedAccessToken: maskedAccessToken,
                refreshToken: refreshToken,
                accessToken: accessToken
            };


            await authSvc.createAuthData(authData);

            res.json({
                data: {
                    refreshToken: maskedRefreshToken,
                    accessToken: maskedAccessToken
                },
                message: `Welcome to ${userDetail.role} portal`,
                status: "USER_LOGGED_IN_SUCCESS",
                options: null
            })
           
        }catch(exception){
            next(exception);
        }
    }

    forgetPassword = async(req, res, next)=>{
        try{
            const {email} = req.body;
            const userDetail = await userSvc.getSingleUserByFilter({
                email: email
            });

            if(!userDetail){
                throw({
                    code: 422,
                    detail: {
                        email: "Email not registered yet"
                    },
                    message: "User not found or registered yet",
                    status: "USER_NOT_FOUND_OR_REGISTERED"
                })
            };

            const forgetPasswordData = {
                forgetPasswordToken: randomStringGenerator(100),
                expiryTime: new Date(Date.now() + 3 * 60 * 60 * 1000) //3 hours
            }
            const updateData = await userSvc.updateSingleUserByFilter({
                _id: userDetail._id
            }, forgetPasswordData);


            // email notification
            await authSvc.sendResetPasswordNotificationEmail(updateData);


            res.json({
                data: null,
                message: "Password reset instruction sent to your email",
                status: "PASSWORD_RESET_INSTRUCTION_SENT",
                options: null   
            });

        }catch(exception){
            console.log(exception);
            next(exception);
        }
    }

}

const authCtrl = new AuthController();
module.exports = authCtrl;
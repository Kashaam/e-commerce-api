const { AppConfig } = require("../config/config");
const authSvc = require("../module/auth/auth.service");
const jwt = require('jsonwebtoken');
const userSvc = require("../module/user/user.service");
const { Roles } = require("../config/constant.config");

const auth = (role = null) => {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        throw {
          code: 402,
          message: "Token not found or unauthorized",
          staus: "TOKEN_NOT_FOUND_UNAUTHORIZED",
          options: null,
        };
      }
      token = token.replace("Bearer ", "");

      const authData = await authSvc.getSingleRowByFilter({
        maskedAccessToken: token
      });

      if(!authData){
        throw({
            code: 401,
            message: "Token not found",
            status: "TOKEN_NOT_FOUND"
        })
      }

      const data = jwt.verify(authData.accessToken, AppConfig.jwt_secret);
      if(data.typ != "Bearer"){
        throw{
            code: 402,
            message: "Bearer token expexted",
            status: "BEARER_TOKEN_EXPECTED"
        }
      }

      let userDetail = await userSvc.getSingleUserByFilter({
        _id: data.sub
      });

      if(!userDetail){
        throw({
            code: 403,
            message: "User not found",
            status: "USER_NOT_FOUND"
        })
      }


      userDetail = userSvc.publicUserProfile(userDetail);
      req.loggedInUser = userDetail;


      if(userDetail.role == Roles.ADMIN || role === null || Array.isArray(role) && role.includes(userDetail.role)){
        next()
      } else{
        throw{
            code: 403,
            message: "Access Denied",
            status: "ACCESS_DENIED"
        }
      }
    } catch (exception) {
      next(exception);
    }
  };
};

module.exports = auth;

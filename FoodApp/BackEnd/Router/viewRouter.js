const express=require("express");
const { isLoggedIn,logout,  } = require("../Controller/AuthController");
const {getHomePage,getLoginPage,getSignupPage,getPlansPage,getResetPasswordPage}=require("../Controller/viewController");
const viewRouter=express.Router();
viewRouter.use(isLoggedIn);
viewRouter.route("").get(getHomePage);
// viewRouter.route("/home").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/resetpassword/:token").get(getResetPasswordPage);
module.exports=viewRouter;

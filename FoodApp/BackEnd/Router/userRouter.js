const express=require("express");
const { createPlan } = require("../Controller/planController");

const userRouter=express.Router();

const{
    getAllUsers, createUser,getUserById,updateUserById,deleteUserById

}=require("../Controller/userController")

userRouter.route("").get(getAllUsers).post(createUser);

userRouter.route(":id").get(getUserById).post(updateUserById).delete(deleteUserById);


module.exports=userRouter;

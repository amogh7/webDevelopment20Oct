let userModel=require("../Model/usersModel");
const jwt=require("jsonwebtoken");
const { SECRET_KEY } = require("../config/secrets");
async function signup(req,res){
try{
       let user=req.body;
      let newUser=await userModel.create({
           name:user.name,
           email:user.email,
           password:user.password,
           confirmPassword:user.confirmPassword,
           role:user.role

       });
       console.log(newUser);
       res.status(201).json({
           message:"Successfully Signed up ",
           data:newUser,
       });

}
catch(error){
    res.status(501).json({
        message:"Failed to send",
        error:error,
    });
}
}

async function login(req,res){
    try{
           let {email,password}=req.body;
           console.log(email,password);
           let loggedInUser=await userModel.find({email:email});
           if(loggedInUser.length){
               let user=loggedInUser[0];
               if(user.password==password){
                   const token=jwt.sign({id:user["_id"]},SECRET_KEY);
                   res.status(200).json({
                       message:"loged in Successfuly",
                       data:loggedInUser[0],
                       token,
                   });
               }else{
                   res.status(200).json({
                       message:"Email and password did not match"
                   });
               }

           }
           else{
               res.status(200).json({
                   message:"No user found signUp First"
               });
           }

    }
    catch(error){
        res.status(501).json({
            message:"login failed",
            error,
        }); 
    }
}

async function protectRoute(req,res,next){
    try{
        const token=req.headers.authorization.split(" ").pop();
        console.log(token);
        console.log("Inside protect route");
        const payload=jwt.verify(token,SECRET_KEY);
        console.log(payload);
        if(payload){
            req.id=payload.id;
            next();
        }
        else{
            res.status(501).json({
                message:"Please Log in"
            });
        }
    }
    catch(error){
        res.status(501).json({
            message:"Please Log in",
            error
        });
    }
}

async function isAuthorized(req , res , next){
    try{
      let id = req.id;
      let user = await userModel.findById(id);
      console.log(user);
      if(user.role == "admin"){
        next();
      }else{
        res.status(200).json({
          message:"You dont have admin rights !!!"
        })
      }
    }
    catch(error){
      res.status(501).json({
        message:"Failed to Authorize",
        error
      });
    }
  }

  async function forgetPassword(req,res){
      try{
           const {email}=req.body;
        //    console.log(email);  
        let user=await userModel.findOne({email:email});
        console.log(user);
        if(user){
            let token=user.createResetToken();
            console.log(token);
            let updatedUser=await user.save({validateBeforeSave:false});
                console.log(updatedUser);
                let resetLink=`http://localhost:3000/api/users/resetpassword/${token}`;
                res.status(201).json({
                    message:"sent successfuly",
                    resetLink:resetLink
                });

                  }
                  else{
                      res.statu(404).json({
                          message:"User Not found ! please Sign up First"
                      });
                  }
      }
      catch(error){
        res.statu(501).json({
            message:"Failed to forget",
            error
        });
      }
  }
  async function resetPassword(req,res){
      try{
          const token=req.params.token;
          const {password,confirmPassword}=req.body;
          const user=await userModel.findOne({
            pwToken:token,
            tokenTime:{$gt:Date.now()}
          });
          console.log(user);
          console.log(password,confirmPassword);
          if(user){
              user.resetPasswordHandler(password,confirmPassword);
              await user.save();
              res.status(201).json({
                  message:"Pasword Reset Successful !!!"
              });
            }
              else{
              res.status(404).json({
                message:"Pasword Reset Link expired!!!"
            });
        }

              
          }
      
      catch(error){
        res.status(501).json({
            message:"Pasword Reset Failed !!!",
            error
        });

      }
  }
module.exports.isAuthorized=isAuthorized;
module.exports.signup=signup;
module.exports.login=login;
module.exports.protectRoute=protectRoute;
module.exports.forgetPassword=forgetPassword; 
module.exports.resetPassword=resetPassword;
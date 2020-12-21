const Userdb=require("../Model/usersModel.json");
const {v4:uuidv4}=require("uuid");

const fs=require("fs");

function getAllUsers(req,res){
    if(userDb.length){
        res.status(201).json({
             message:"Succsessfully got all users",
             data:userDb
        }

        );
        
}
else{
        res.status(200).json({
            message:"no users found"
        });
} 

}

function createUser(req,res){
    let user=req.body;
    user.id=uuidv4();
    userDb.push(user);
    let userPath=path.join(__dirname,'..','Model','userModel.json');
    fs.writeFileSync(userPath,JSON.stringify(userDb));

    
    res.status(201).json({
        message:"created a plan",
        data:userDb,

    });
}


function deleteUserById(req,res){
        let {id}=req.params;
        let filterdUsers=userDb.filter((user)=>{
            return user.id!=id;
        });
        
        if(filterdUsers.length==userDb.length){
            res.status(404).json({
                message:"no user found"
            });
        }
        else{
            let userPath=path.join(__dirname,'..','Model','userModel.json');
            fs.writeFileSync(userPath,JSON.stringify(filterdUsers));
            res.status(201).json({
                message:"Sucessfully deleted",
                data:filterdUsers
            });
        
        }
    }

    function updateUserById(req,res){
        let {id}=req.params;
        let updatedObject=req.body;
    
        let filteredUser=userDb.filter(function(user){
           return user.id==id;
        });
    
    
        if(filteredUser.length){
            let user=filteredUser[0];
            for(key in updatedObject){
                user[key]=updatedObject[key];
            }
            let userPath=path.join(__dirname,'..','Model','userModel.json');

            fs.writeFileSync(userPath,JSON.stringify(userDb));
            res.status(200).json({
                message:"user updated",
            });
        }
        else{
            res.status(404).json({
                message:"user not found", 
            });
    
        }
    }
    function getUserById(req,res){
        let {id}=req.params;
        let filteredObject=userDb.filter( (user) => {
                return user.id==id;
        });
        
        if(filteredObject.length){
            res.status(200).json({
                message:"Successfully got user",
                data:filteredObject
            });
        }
        else{
            res.status(404).json({
                message:"NO user found",
              
            });
        }
    }


    module.exports.getAllUsers=getAllUsers;
    module.exports.createUser=createUser;
    module.exports.deleteUserById=deleteUserById;
    module.exports.updateUserById=updateUserById;
    module.exports.getUserById=getUserById;


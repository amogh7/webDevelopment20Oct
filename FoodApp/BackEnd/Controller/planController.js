const plans=require("../Model/plansModel.json");

const {v4:uuidv4}=require("uuid");

const fs=require("fs");

let path=require("path");

function getAllPLans(req,res){
    if(plans.length){
        res.status(200).json(
            {
                message:"Successfuly got all plans",
                data:plans,
            }
        );
    }
    else{
        res.status(404).json(
            {
                message:"No  plans found",
                
            }   
        );
    }
}


function createPlan(req,res){
    let plan =req.body;
    plan.id=uuidv4();
    plans.push(plan);
    let plansPath=path.join(__dirname,'..','Model','plansModel.json');
    fs.writeFileSync(plansPath ,JSON.stringify(plans));

    res.status(201).json({
        message:"created a plan",
        data:plans,

    });
}

function deletePlanById(req,res){
    let {id}=req.params;
    let filteredPlans=plans.filter(function(plan){
        return plan.id!=id;
    });

    if(filteredPlans.length==plans.length){
        res.status(404).json({
            message:"Plan not found"
        });
    }
    else{
        let plansPath=path.join(__dirname,'..','Model','plansModel.json');
        fs.writeFileSync(plansPath,JSON.stringify(filteredPlans));
        res.status(200).json({
            message:"sucessfully deleted",
            data:filteredPlans
        });
    }
}

function getPlanById(req,res){
    let {id}=req.params;
    let filteredPlans=plans.filter(function(plan){
           return plan.id==id;
    });
    if(filteredPlans.length){ 
        res.status(200).json({
            message:"successfuly updated",
            data:filteredPlans
        });
    }
    else{
      res.status(404).json(
          {
              message:"No  plans found",
              
          }   
      );
  }
}

function updatePlanById(req,res){
    let {id}=req.params;
     let updatedObject=req.body;

     let filteredPlan=plans.filter(function(plan){
        return plan.id==id;
     });


     if(filteredPlan.length){
         let plan=filteredPlan[0];
         for(key in updatedObject){
             plan[key]=updatedObject[key];
         }
         let plansPath=path.join(__dirname,'..','Model','plansModel.json');
         fs.writeFileSync(plansPath,JSON.stringify(plans));
         res.status(200).json({
             message:"plan updated",
         });
     }
     else{
         res.status(404).json({
             message:"plan not found", 
         })

     } 
}

module.exports.getAllPLans=getAllPLans;
module.exports.createPlan=createPlan;
module.exports.deletePlanById=deletePlanById;
module.exports.getPlanById=getPlanById;
module.exports.updatePlanById=updatePlanById;
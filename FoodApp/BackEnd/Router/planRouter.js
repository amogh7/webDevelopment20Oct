const express=require("express");

const PlanRouter=express.Router();

const{
getAllPLans,
createPlan,
getPlanById,
updatePlanById,
deletePlanById,


}=require("../Controller/planController");

PlanRouter.route("").get(getAllPLans).post(createPlan);
PlanRouter.route("/:id").get(getPlanById).patch(updatePlanById).delete(deletePlanById);




module.exports=PlanRouter;



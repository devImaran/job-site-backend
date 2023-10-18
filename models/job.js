const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    role:{type:String},
    profile:{type:String},
    description:{type:String},
},{timestamps:true})

const jobModel=mongoose.model('jobs',jobSchema)
module.exports=jobModel
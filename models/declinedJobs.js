const mongoose=require('mongoose');

const declinedJobSchema=new mongoose.Schema({
    role:{type:String,required:true},
    profile:{type:String,required:true},
    description:{type:String},
    userId:{type:mongoose.Types.ObjectId,ref:'users'},
},{timestamps:true})

const declinedJobModel=mongoose.model('declinedJobs',declinedJobSchema)
module.exports=declinedJobModel
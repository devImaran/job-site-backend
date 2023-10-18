const mongoose=require('mongoose');

const appliedJobSchema=new mongoose.Schema({
    role:{type:String,required:true},
    profile:{type:String,required:true},
    description:{type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,ref:'users'}
},{timestamps:true})

const appliedJobModel=mongoose.model('appliedJobs',appliedJobSchema)
module.exports=appliedJobModel
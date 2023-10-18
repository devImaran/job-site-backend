const mongoose=require('mongoose');

const approvedJobSchema=new mongoose.Schema({
    jobId:{type:mongoose.Types.ObjectId,ref:'jobs' },
    userId:{type:mongoose.Types.ObjectId,ref:'users'},
    interview_date:{type:Date,required:true},
    conference_link:{type:String,required:true}
},{timestamps:true})

const appliedJobModel=mongoose.model('approvedJobs',approvedJobSchema)
module.exports=appliedJobModel
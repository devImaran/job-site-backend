const jobModel=require('../models/job');
const approvedJobs=require('../models/approvedJobs')
const declinedJobModel=require('../models/declinedJobs')
const appliedJobModel=require('../models/appliedJob')
const userJobModel=require('../models/user')

const transporter = require('../email');

exports.jobCreate=(req,res)=>{
    const newJobModel=new jobModel(req.body)
    newJobModel.save().then(data=>{
        res.status(200).json({data,msg:"job created successfully"})
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err})
    })
}

exports.jobShow=(req,res)=>{
    jobModel.find().then(data=>{
        res.status(200).json({data})
    }).catch(err=>{
        res.status(500).json({err})
    })
}

exports.approvedJobs=(req,res)=>{
    const {userId,jobId,conference_link,interview_date}=req.body;
    const newApprovedJobs=new approvedJobs(req.body)
    newApprovedJobs.save().then(data=>{
        if(data){
            appliedJobModel.findOneAndRemove({userId:userId}).then(data=>{
                userJobModel.findOne({_id:userId}).then(data=>{
                    const userEmail=data.email
                    transporter.sendMail({
                         to:userEmail,
                         subject: 'Regarding job',
                         html:`congratulations.your application is approved now.prepare yourself and get ready for the interview.join this <a href="${conference_link}"><h3>conference link</h3></a> on ${interview_date}`
                       },(err,result)=>{
                           if(err) throw err
                           if(result){
                             return res.status(200).json({msg:'candidate approved'})
                           }
                        })
                }).catch(err=>{
                    console.log(err)
                })
               
                }).catch(err=>{
                        res.status(400).json({err})
                    })
        }
    }).catch(err=>{
        console.log(err)
    })
   
}

exports.showApprovedJobs=(req,res)=>{
    approvedJobs.find().populate('userId').populate('jobId').then(data=>{
       return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.declinedJobs=(req,res)=>{
    const {role,profile,description,userId}=req.body
    console.log(req.body)
    appliedJobModel.findOneAndRemove({userId:userId._id}).then(data=>{
        if(data){
            const newDeclinedJobModel=new declinedJobModel({role,profile,description,userId:userId._id})
            newDeclinedJobModel.save().then(data=>{
                res.status(200).json({msg:'candidate declined successfully'})
                transporter.sendMail({
                    to:userId.email,
                    subject:'regarding job application',
                    text:'sorry you are not selected ..work hard and try again dont be upset'
                },(err,result)=>{
                    if(err) throw err
                })
            }).catch(err=>{
                 return res.status(400).json({err,msg:'not declined '})
            })
        }
    }).catch(err=>{
        console.log(err)
    })
   
   
}
exports.showDeclinedJobs=(req,res)=>{
   declinedJobModel.find().populate('userId').then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
   
}
exports.singleJobDetail=(req,res)=>{
    const jobId=req.params.id
    jobModel.findById(jobId).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
     })
}
exports.userAppliedJobShow=(req,res)=>{
    const myId=req.params.id
    appliedJobModel.find({userId:myId}).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
     })
}
exports.userAppliedJobShowAll=(req,res)=>{
    appliedJobModel.find().populate('userId').then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
     })
}

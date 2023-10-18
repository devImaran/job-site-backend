const registerModel=require('../models/user');
const appliedJobModel=require('../models/appliedJob');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const env=require('dotenv')
env.config()
const crypto=require('crypto')
const transporter=require('../email')

exports.registerController=(req,res)=>{
    const {fullname,username,email,pass,dob,mobile,role}=req.body

    bcrypt.hash(pass, 10).then((hash)=>{
        const password=hash;
        const newRegisterModel=new registerModel({
            fullname,username,email,password,dob,mobile,role
        })
         newRegisterModel.save().then(data=>{
             res.status(201).json({data,msg:'registration successfull'})
         }).catch(err=>{
             res.status(500).json({err})
         })
    });
    
}

exports.userLoginController=(req,res)=>{
    const {email,pass}=req.body
   
    registerModel.find({email:email}).then(data=>{
      if(data){
            bcrypt.compare(pass,data[0].password,(err,result)=>{
                if(err) throw err

                if(result){
                    const {_id,fullname,email,role}=data[0]
                    const user={_id,fullname,email,role}
                    const token=jwt.sign({_id:data[0]._id,role:data[0].role},process.env.JWT_AUTH)
                     res.status(200).json({token,user,'msg':'you are logged in'})
                }else{
                    return res.status(400).json({'msg':'Wrong Password'})
                }
            })
        }
    }).catch(err=>{
        res.status(400).json({'msg':'Invalid Email'})
    })
}

exports.userAppliedJob=(req,res)=>{
 const newAppliedJobModel=new appliedJobModel(req.body)
    newAppliedJobModel.save().then(data=>{
    return res.status(200).json({data,msg:'Applied Successfully'})
    }).catch(err=>{
    return res.status(400).json({err})
})
}



exports.userChangePassword=(req,res)=>{
    const myId=req.params.id;
    console.log(myId)
    console.log(req.body)
    const {pass,new_pass}=req.body
    registerModel.findById(myId).then(data=>{
        
        bcrypt.compare(pass,data.password,(err,result)=>{
            if(err) throw err

            if(result){
                console.log(result)
                bcrypt.hash(new_pass, 10).then((hash)=>{
                    const password=hash;
                     registerModel.findOneAndUpdate({_id:data._id},{password:password})
                     .then(data=>{
                         return res.status(200).json({msg:"password updated successfully"})
                     }).catch(err=>{
                        return res.status(400).json({err})
                     })
                    
                });
            }else{
                return res.status(400).json({'msg':'wrong password'})
            }
        })
               
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.userChangePassword=(req,res)=>{
    const myId=req.params.id;
    console.log(myId)
    console.log(req.body)
    const {pass,new_pass}=req.body
    registerModel.findById(myId).then(data=>{
        
        bcrypt.compare(pass,data.password,(err,result)=>{
            if(err) throw err

            if(result){
                console.log(result)
                bcrypt.hash(new_pass, 10).then((hash)=>{
                    const password=hash;
                     registerModel.findOneAndUpdate({_id:data._id},{password:password})
                     .then(data=>{
                         return res.status(200).json({msg:"password updated successfully"})
                     }).catch(err=>{
                        return res.status(400).json({err})
                     })
                    
                });
            }else{
                return res.status(400).json({'msg':'wrong password'})
            }
        })
               
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.showAllRegisteredHr=(req,res)=>{
    registerModel.find({role:'hr'}).then(data=>{
        res.status(200).json({data})
    }).catch(err=>{
        res.status(400).json({err})
    })
}

exports.showAllRegisteredAdmins=(req,res)=>{
    registerModel.find({role:'admin'}).then(data=>{
        res.status(200).json({data})
    }).catch(err=>{
        res.status(400).json({err})
    })
}

exports.showAllRegisteredUsers=(req,res)=>{
    registerModel.find({role:'user'}).then(data=>{
        res.status(200).json({data})
    }).catch(err=>{
        res.status(400).json({err})
    })
}

exports.showOneRegisteredUsers=(req,res)=>{
    const id=req.params.id
    registerModel.findById(id).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.updateRegisteredUsers=(req,res)=>{
    const id=req.params.id
    const {fullname,username,email,mobile}=req.body
    console.log(req.body)
    registerModel.findByIdAndUpdate(id,{
        fullname:fullname,
        username:username,
        email:email,
        mobile:mobile
    }).then(data=>{
        return res.status(200).json({data,msg:"Profile Updated"})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.deleteRegisteredUsers=(req,res)=>{
    const id=req.params.id
    registerModel.findByIdAndDelete(id).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}
exports.forgetPassword=(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err) {
            return console.log(err)
        }
        const token=buffer.toString('hex')

        const {email}=req.body
        registerModel.findOne({email:email}).then(data=>{
            if(!data){   
                return res.status(400).json({err,msg:`Email doesn't exits`})
            }
            registerModel.findOneAndUpdate({email:email},{ resetToken:token,expired:Date.now()+900000}).then(data=>{
                transporter.sendMail({
                        to:email,
                        subject:'Reset Password',
                        html:`
                        <p>you requested for password change</p>
                        <h5>click on this <a href="http://localhost:3000/reset/password/${token}">link</a> to change your password</h5>
                        `
                    },(err,info)=>{
                        if(err) throw err
                        
                        return res.status(200).json({msg:'check your email'})
                        
                    })
            }).catch(err=>{
                console.log(err)
            })
                
                }).catch(err=>{
                    console.log(err)
                 })
    })
}

    exports.resetPassword=(req,res)=>{
        const {sendToken,pass}=req.body
        console.log(sendToken)
        bcrypt.hash(pass,10).then(hashed=>{
            const new_pass=hashed;
            registerModel.findOneAndUpdate({resetToken:sendToken,expired:{$gt:Date.now()}},{password:new_pass}).then(data=>{
               if(data){
                return res.status(200).json({msg:'password updated'})
               }
               
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
        
    }

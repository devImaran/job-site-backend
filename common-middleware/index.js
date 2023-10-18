const jwt=require('jsonwebtoken')
const env=require('dotenv')
env.config()

exports.authenticate=(req,res,next)=>{
    const tokenHeader=req.headers.jwt_react
    
    jwt.verify(tokenHeader,process.env.JWT_AUTH,(err,decode)=>{
    if (err){
        return res.status(401).json({'msg':'unauthorize'})
    }
    req.user=decode
    next()
    })
    
}

exports.superAdminMiddleware=(req,res,next)=>{
    console.log(req.user)
    if(req.user.role!=='super_admin'){
        return res.status(400).json({msg:"super admin access denied"})
    }
    next()
}
exports.adminMiddleware=(req,res,next)=>{
    console.log(req.user)
    if(req.user.role!=='admin'){
        return res.status(400).json({msg:"admin access denied"})
    }
    next()
}

exports.hrMiddleware=(req,res,next)=>{
    console.log(req.user)
    if(req.user.role!=='hr'){
        return res.status(400).json({msg:"hr access denied"})
    }
    next()
}

exports.userMiddleware=(req,res,next)=>{
    console.log(req.user)
    if(req.user.role!=='user'){
        return res.status(400).json({msg:"user access denied"})
    }
    next()
}


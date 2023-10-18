const {check,validationResult} =require('express-validator')

exports.signUpRequestValidator=[
    check('fullname')
    .notEmpty()
    .withMessage('fullname is required'),

    check('username')
    .notEmpty()
    .withMessage('username is required'),

    check('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('valid email is required'),

    check('pass')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:4})
    .withMessage('password must be atleast 4 character long'),

    check('dob')
    .notEmpty()
    .withMessage('dob is required'),

    check('mobile')
    .notEmpty()
    .withMessage('mobile is required')
    .isLength({min:10,max:10})
    .withMessage('valid number is required')

];

exports.signUpRequestValidatorResult=(req,res,next)=>{
    const error=validationResult(req)
    if(error.array().length>0){
        return res.status(400).json({error:error.array()[0].msg})
    }
    next()
}

exports.loginRequestValidator=[
    check('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('valid email is required'),

    check('pass')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:4})
    .withMessage('password must be atleast 3 character long'),
];

exports.loginRequestValidatorResult=(req,res,next)=>{
    const error=validationResult(req)
    if(error.array().length>0){
        return res.status(400).json({error:error.array()[0].msg})
    }
    next()
}

exports.jobRequestValidator=[
    check('role')
    .notEmpty()
    .withMessage('Job Title Is Required'),

    check('profile')
    .notEmpty()
    .withMessage('Job Designation Is Required'),

    check('description')
    .notEmpty()
    .withMessage('Job Details Is Required')
    .isLength({min:5})
    .withMessage('Job Detail mustbe atleast 5 charecter long')

];

exports.jobRequestValidatorResult=(req,res,next)=>{
    const error=validationResult(req)
    if(error.array().length>0){
        return res.status(400).json({error:error.array()[0].msg})
    }
    next()
}

exports.approveRequestValidator=[
    check('interview_date')
    .notEmpty()
    .withMessage('Interview Date Is Required'),

    check('conference_link')
    .notEmpty()
    .withMessage('Conference Link Is Required'),
];

exports.approveRequestValidatorResult=(req,res,next)=>{
    const error=validationResult(req)
    if(error.array().length>0){
        return res.status(400).json({error:error.array()[0].msg})
    }
    next()
}
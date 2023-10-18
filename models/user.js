const mongoose=require('mongoose');

const registerSchema=new mongoose.Schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true,unique:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true,min:5},
    dob:{type:Date,required:true},
    mobile:{type:Number,required:true,trim:true},
    role:{type:String,default:'user'},
    resetToken:{type:String,default:'undefined'},
    expired:{type:Date}
},{timestamps:true})

const registerModel=mongoose.model('users',registerSchema)
module.exports=registerModel
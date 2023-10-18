const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors')
const body_parser=require('body-parser')
require('dotenv').config();
const userRouter=require('./routes/user')
const applicationRouter=require('./routes/application')


mongoose.connect(process.env.DB_CONN,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
    console.log('db connected')
}).catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(body_parser.json())
app.use('/api',userRouter)
app.use('/application',applicationRouter)


app.get('/',(req,res)=>{
    res.send('hello from node')
})

app.listen(process.env.PORT,()=>{
    console.log('server started')
})
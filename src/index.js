const express = require('express')
const { mongoose } = require('mongoose')
const route = require('./routes/route')
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://palsubodh:Palsubodh@cluster0.mhegah9.mongodb.net/Intern",{useNewUrlParser:true})
.then(()=>console.log("mongoDb is connected"))
.catch((err)=>console.log(err))

app.listen(3000,function(){
    console.log("Port is running on 3000 ")
})

app.use("/",route)
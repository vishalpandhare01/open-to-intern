const express = require('express')
const { mongoose } = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://palsubodh:Palsubodh@cluster0.mhegah9.mongodb.net/Intern",{useNewUrlParser:true})
.then(()=>console.log("mongoDb is connected"))
.catch((err)=>console.log(err))

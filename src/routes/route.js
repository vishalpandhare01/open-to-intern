const express=require('express')
const router = express.Router()
const college = require("../Controller/collegeController")
const internControl = require('../Controller/internController')


router.post("/functionup/colleges",college.createCollege)
router.post("/functionup/interns",internControl.createIntern)
router.get("/functionup/collegeDetails",internControl.collegeDetails)


router.all("/*" ,  function(req,res){
    res.status(404).send({msg:"provied validPath"})
})



module.exports=router
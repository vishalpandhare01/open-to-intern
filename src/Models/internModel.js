const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const internModel = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    mobile:{type:String,require:true,unique:true},
    collegeId:{type:ObjectId,ref:"CollegeData"},
    isDeleted:{type:Boolean,default:false}

})

module.exports= mongoose.model("InternData",internModel)
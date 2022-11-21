const internModel = require("../Models/internModel");
const collegeModel = require("../Models/collegeModel");
const {
  valid,
  regForName,
  regForFullName,
  regForEmail,
  regForMobileNo,
} = require("../Validator/validation");

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    let { name, email, mobile, fullName } = data;

    if (!(name && email && mobile && fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "All Fields are Mandatory." });
    }

    if (!valid(name))
      return res
        .status(400)
        .send({ status: false, msg: "Provide a valid Name." });
    if (!regForFullName(name))
      return res
        .status(400)
        .send({
          status: false,
          msg: "Invalid Name or Each Word's First letter Should be in Uppercase.",
        });

    if (!valid(email))
      return res
        .status(400)
        .send({ status: false, msg: "Provide a valid Email." });

    if (!regForEmail(email))
      return res.status(400).send({ status: false, msg: "Invalid Email." });

    let checkDuplicate = await internModel.findOne({ email: email });
    if (checkDuplicate) {
      return res
        .status(400)
        .send({ status: false, msg: "Email Already Exist." });
    }

    if (!valid(mobile))
      return res
        .status(400)
        .send({ status: false, msg: "Provide a valid Mobile Number." });
    if (!regForMobileNo(mobile))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid Mobile Number." });
    let duplicateMobile = await internModel.findOne({ mobile: mobile });
    if (duplicateMobile) {
      return res
        .status(400)
        .send({ status: false, msg: "Mobile Number Already Exist." });
    }

    if (!valid(fullName))
      return res
        .status(400)
        .send({ status: false, msg: "Provide a valid fullName." });
    //if (!regForName(fullName)) return res.status(400).send({ status: false, msg: "Invalid fullName." })

    let getCollegeId = await collegeModel.findOne({ fullName: data.fullName });
    if (!getCollegeId) {
      return res
        .status(400)
        .send({ status: false, msg: `Your ${data.fullName} is not Exist.` });
    }

    data.collegeId = getCollegeId["_id"];
    let internData = await internModel.create(data);

    let obj = {
      isDeleted: internData.isDeleted,
      name: internData.name,
      email: internData.email,
      mobile: internData.mobile,
      collegeId: internData.collegeId,
    };
    res
      .status(201)
      .send({
        status: true,
        msg: `${name}'s Intern Data Created Sucessfully.`,
        data: obj,
      });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const collegeDetails = async function (req, res) {
  try {
    const CollegeName = req.query.collegeName;
    if (!CollegeName)
    {
      return res
        .status(404)
        .send({ status: false, msg: "CollegeName is required" });}

    const collageData = await collegeModel
      .find({ fullName: CollegeName }).select({_id:1})
    if(collageData.length==0) return res.status(404).send({status:false,msg:"No data found"})
    //console.log(collageData);

    let findintern= await internModel.find({collegeId:collageData}).select({_id:1,name:1,mobile:1,email:1})
    console.log(findintern)
    let findCollege = await collegeModel.find({fullName:CollegeName}).select({_id:0,name:1,fullName:1,logoLink:1})
    //console.log(findCollege)
    const obj={
        name:findCollege[0].name,
        fullName:findCollege[0].fullName,
        logoLink:findCollege[0].logoLink,
        interns:findintern
    }
    res.status(200).send({ status: true, data:obj });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createIntern, collegeDetails };

const CollegeModel = require("../Models/collegeModel")


const Validation = function (value) {
    
    if (typeof value == "number" || typeof value == "undefined" || typeof value == null) { return false }
    if (typeof value == "string" && value.trim().length == 0) { return false }
    return true
}


const createCollege = async function (req, res) {


    try {
        let Data = req.body;

        const { name, fullName, logoLink } = Data;

        if (Object.keys(Data) == 0) return res.status(400).send({ status: false, msg: "Bad request/Plase provied data" });

        if (!Validation(name)) { return res.status(400).send({status: false, msg:"name is require/fill tha name"}) }

        let nameUnique = await CollegeModel.findOne({name:name})

        if(nameUnique){return res.status(400).send({status: false, msg: "college already exist in DataBase"})}

        if (!Validation(fullName)) { return res.status(400).send({status:false, msg: "Full name is require/fill the full name"}) }

        let fullNameUnique  = await CollegeModel.findOne({fullName:fullName})

        if(fullNameUnique){return res.status(400).send({status: false, msg: "college already exist in DataBase"})}

        if (!Validation(logoLink)) { return res.status(400).send({status:false, msg:"logoLink is require/provied the logoLink"}) }

        Data.name = name.toLowerCase()

        const addCollege = await CollegeModel.create(Data);
        return res.status(201).send({ status: true, msg: "college create successfully" , addCollege })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.createCollege = createCollege
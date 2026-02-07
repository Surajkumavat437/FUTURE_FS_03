const Contact = require("../models/Contact");

const createContact = async(req,res)=> {
    try{
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(200).json({
            success:true,
            data:newContact,
        })
    } catch(error) {
        res.status(500).json({
            success:fasle,
            message:error.message,
        })
    }
}

module.exports = {createContact};
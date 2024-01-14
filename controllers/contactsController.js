const Contact = require("../models/contact")
const asyncHandler = require("express-async-handler")
exports.get_all_contacts = asyncHandler(async(req, res, next) => {
    const contacts = await Contact.find({})
    res.render("contact", {
        contacts: contacts
    })
})

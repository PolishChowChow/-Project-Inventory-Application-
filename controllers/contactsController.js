const Contact = require("../models/contact")
const asyncHandler = require("express-async-handler")
exports.get_all_contacts = asyncHandler(async(req, res, next) => {
    const contacts = await Contact.find({})
    req.contacts = contacts
    next();
})
exports.get_specific_contact = asyncHandler(async(req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    req.contact = contact;
    next();
})
exports.get_contact_delete = asyncHandler(async(req, res, next) => {
    res.render("deleteForm", {
        id: req.params.id,
        parts: undefined,
        filter: "contact"
    })
})
exports.post_contact_add = asyncHandler(async(req, res, next) => {
    const contact = new Contact(req.body)
    await contact.save();
    next()
})
exports.post_contact_update = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    await Contact.findByIdAndUpdate(id, req.body)
    next();
})
exports.post_contact_delete = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    await Contact.findByIdAndDelete(id);
    res.redirect("/panel/contact")
})
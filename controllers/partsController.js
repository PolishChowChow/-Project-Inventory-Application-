const Part = require("../models/part")
const asyncHandler = require("express-async-handler");

exports.get_all_parts = asyncHandler(async(req, res, next) => {
    const parts = await Part.find({})
    .populate("brand")
    .populate("category")
    req.category = null;
    req.parts = parts;
    next();
})

exports.get_specific_part = asyncHandler(async(req, res, next) => {
    const specificPart = await Part.findById(req.params.id)
    .populate("brand")
    .populate("category")
    .exec()
    req.category = null;
    req.part = specificPart
    next()
})
exports.get_part_delete = asyncHandler(async(req, res, next) => {
    res.render("deleteForm", {
        id: req.params.id,
        parts: undefined,
        filter: "part"
    })
})
exports.post_part_update = asyncHandler(async(req, res, next) => {
    const part = req.body;
    const id = req.params.id;
    await Part.updateOne({_id: id},part);
    next()
})
exports.post_part_add = asyncHandler(async(req, res, next) => {
    const part = new Part(req.body);
    await part.save();
    next()
})

exports.post_part_delete = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    await Part.findByIdAndDelete(id);
    res.redirect("/panel/part")
})
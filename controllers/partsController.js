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

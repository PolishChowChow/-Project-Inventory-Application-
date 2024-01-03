const Part = require("../models/part")
const asyncHandler = require("express-async-handler");

exports.get_all_parts = asyncHandler(async(req, res, next) => {
    const parts = await Part.find({});
    res.render("parts",{
        category: null,
        parts: parts
    })
})

exports.get_specific_part = asyncHandler(async(req, res, next) => {
    const specificPart = Part.findById(req.params.id)
    res.render("part", {
        category: null,
        part: specificPart
    })
})

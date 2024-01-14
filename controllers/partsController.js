const Part = require("../models/part")
const asyncHandler = require("express-async-handler");

exports.get_all_parts = asyncHandler(async(req, res, next) => {
    const parts = await Part.find({})
    res.render("parts",{
        category: null,
        parts: parts
    })
})

exports.get_specific_part = asyncHandler(async(req, res, next) => {
    const specificPart = await Part.findById(req.params.id)
    .populate("brand")
    .populate("category")
    .exec()
    console.log(specificPart.brand.name)
    
    
    res.render("part", {
        category: null,
        part: specificPart
    })
})

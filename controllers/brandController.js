const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
exports.get_all_brands = asyncHandler(async(req, res, next) => {
    const brands = await Brand.find({});
    req.brands = brands
    next()
})
exports.get_specific_brand = asyncHandler(async(req, res, next) => {
    const brand = await Brand.findById(req.params.id)
    res.render("brand", {
        brand: brand,
    })
})
const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const Part = require("../models/part");
exports.get_all_brands = asyncHandler(async(req, res, next) => {
    const brands = await Brand.find({});
    req.brands = brands
    next()
})
exports.get_specific_brand = asyncHandler(async(req, res, next) => {
    const brand = await Brand.findById(req.params.id)
    req.brand = brand;
    next();
})
exports.get_brand_delete = asyncHandler(async(req, res, next) => {
    let parts = undefined;
    const partsFounded = await Part.find({brand: req.params.id})
    .populate("brand")
    .populate("category")
    .exec()
    if(partsFounded.length > 0){
        parts = partsFounded
    }
    res.render("deleteForm", {
        id: req.params.id,
        parts: parts,
        filter: "brand"
    })
})
exports.post_brand_add = asyncHandler(async(req, res, next) => {
    const brand = new Brand(req.body);
    await brand.save();
    next();
})
exports.post_brand_update = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    await Brand.findByIdAndUpdate(id, req.body)
    next();
})
exports.post_brand_delete = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    await Brand.findByIdAndDelete(id);
    res.redirect("/panel/brand")
})
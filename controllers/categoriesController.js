const Category = require("../models/category")
const asyncHandler = require("express-async-handler")
const Part = require("../models/part")
const { name } = require("ejs")
exports.get_all_categories = asyncHandler(async(req, res, next) => {
    const categories = await Category.find({})
    req.categories = categories
    next();  
})
exports.get_specific_category = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    req.category = category;
    next();
})
exports.get_items_by_specific_category = asyncHandler(async(req, res, next) => {
    const categoryId = await Category.find({name: req.params.name},{_id:1})
    const partsByCategory = await Part.find({category: categoryId})
    req.category = req.params.name
    req.parts = partsByCategory
    next();
})
exports.get_item_in_specific_category = asyncHandler(async(req, res, next) => {
    const category = await Category.find({name: name})
    const partByCategory = await Part.find({_id: req.params.id, category: category.id})
    req.category = req.params.name
    req.parts = partByCategory
    next();
})
exports.get_category_delete = asyncHandler(async(req, res, next) => {
    let parts = undefined;
    const partsFounded = await Part.find({category: req.params.id})
    .populate("brand")
    .populate("category")
    .exec()
    if(partsFounded.length > 0){
        parts = partsFounded
    }
    res.render("deleteForm", {
        id: req.params.id,
        parts: parts,
        filter: "category"
    })
})
exports.post_category_add = asyncHandler(async(req, res, next) => {
    const category = new Category(req.body)
    await category.save();
    next();
})
exports.post_category_update = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    await Category.findByIdAndUpdate(id, req.body)
    next();
})
exports.post_category_delete = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.redirect("/panel/category")
})
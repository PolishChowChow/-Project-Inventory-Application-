const Category = require("../models/category")
const asyncHandler = require("express-async-handler")
const Part = require("../models/part")
const { name } = require("ejs")
exports.get_all_categories = asyncHandler(async(req, res, next) => {
    const categories = await Category.find({})
    req.categories = categories
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
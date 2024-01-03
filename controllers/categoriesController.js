const Category = require("../models/category")
const asyncHandler = require("express-async-handler")
const Part = require("../models/part")
const { name } = require("ejs")
exports.get_all_categories = asyncHandler(async(req, res, next) => {
    const categories = Category.find({})
    res.render("categories", {
        categories: categories,
    })
})
exports.get_items_by_specific_category = asyncHandler(async(req, res, next) => {
    const categoryId = await Category.find({name: req.params.name},{_id:1})
    const partsByCategory = await Part.find({category: categoryId})
    res.render("parts", {
        category: req.params.name,
        parts: partsByCategory,
    })
})
exports.get_item_in_specific_category = asyncHandler(async(req, res, next) => {
    const category = await Category.find({name: name})
    const partByCategory = await Part.find({_id: req.params.id, category: category.id})
    res.render("part", {
        category: req.params.name,
        parts: partByCategory,
    })
})
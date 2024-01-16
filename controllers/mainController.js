const asyncHandler = require("express-async-handler");
const part = require("../models/part");
const brand = require("../models/brand");
const category = require("../models/category");
const contact = require("../models/contact");
exports.get_all_stats = asyncHandler(async(req, res, next) => {
  const [partsCount, brandsCount, categoriesCount, contactsCount] = await Promise.all(
    [
      part.countDocuments(),
      brand.countDocuments(),
      category.countDocuments(),
      contact.countDocuments(),
    ])
    res.render("data",{
        partsCount,
        brandsCount,
        categoriesCount,
        contactsCount
    })
});


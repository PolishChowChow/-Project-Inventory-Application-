const express = require('express');
const { get_all_categories, get_items_by_specific_category, get_item_in_specific_category } = require('../controllers/categoriesController');
const { get_all_parts, get_specific_part } = require('../controllers/partsController');
const { get_all_contacts } = require('../controllers/contactsController');
const { get_all_brands, get_specific_brand } = require('../controllers/brandController');
const router = express.Router();

router.get('/',get_all_brands, (req, res, next) => {
    res.render("home",{
        brands: req.brands
    })
});
router.get('/categories', get_all_categories, (req, res, next) => {
    res.render("categories", {
        categories: req.categories,
    })
});
router.get('/categories/:name', get_items_by_specific_category, (req, res, next) => {
    res.render("parts", {
        category: req.category,
        parts: req.parts,
    })
}) 
router.get('/categories/:name/:id', get_item_in_specific_category, (req, res, next) => {
    res.render("part", {
        category: req.category,
        parts: req.parts,
    })
})
router.get('/parts', get_all_parts, (req, res, next) => {
    res.render("parts",{
        category: req.category,
        parts: req.parts
    })
});
router.get('/parts/:id', get_specific_part, (req, res, next) => {
    res.render("part", {
        category: req.category,
        part: req.part
    })
})
router.get('/contact', get_all_contacts, (req, res, next) => {
    res.render("contact", {
        contacts: req.contacts
    })
})
router.get('/about', (req, res, next) => {
    res.render("about")
})
router.get('/about/:id', get_specific_brand, (req, res, next) => {
    res.render("brand",{
        brand: req.brand
    })
})

module.exports = router;

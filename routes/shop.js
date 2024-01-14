const express = require('express');
const { get_all_categories, get_items_by_specific_category, get_item_in_specific_category } = require('../controllers/categoriesController');
const { get_all_parts, get_specific_part } = require('../controllers/partsController');
const { get_all_contacts } = require('../controllers/contactsController');
const { get_all_brands } = require('../controllers/brandController');
const router = express.Router();

router.get('/',get_all_brands, (req, res, next) => {
    const brands = req.brands || []
    res.render("home",{
        brands: brands
    })
});
router.get('/categories', get_all_categories);
router.get('/categories/:name', get_items_by_specific_category)
router.get('/categories/:name/:id', get_item_in_specific_category)
router.get('/parts', get_all_parts);
router.get('/parts/:id', get_specific_part)
router.get('/contact', get_all_contacts)
router.get('/about', (req, res, next) => {
    res.render("about")
})

module.exports = router;

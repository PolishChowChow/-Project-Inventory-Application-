const express = require('express');
const { get_all_categories, get_items_by_specific_category, get_item_in_specific_category } = require('../controllers/categoriesController');
const { get_all_parts, get_specific_part } = require('../controllers/partsController');
const { get_all_contacts } = require('../controllers/contactsController');
const router = express.Router();

/* GET home page. */
router.get('/',(req, res, next) => {
    res.render("home")
});
router.get('/categories', get_all_categories);
router.get('/categories/:name', get_items_by_specific_category)
router.get('/categories/:name/:id', get_item_in_specific_category)
router.get('/parts', get_all_parts);
router.get('/parts/:id', get_specific_part)
router.get('/contact', get_all_contacts)
module.exports = router;

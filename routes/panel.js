const express = require('express');
const passport = require('passport');
const router = express.Router();
const { loginStrategy } = require('../strategies/loginStrategy');
const ensureAuthenticated = require('../controllers/authController');
const { get_all_stats } = require('../controllers/mainController');
const { get_all_parts, get_specific_part, post_part_update, post_part_add, get_part_delete, post_part_delete } = require('../controllers/partsController');
const { get_all_categories, get_specific_category, post_category_add, post_category_update, get_category_delete, post_category_delete } = require('../controllers/categoriesController');
const { get_all_brands, get_specific_brand, post_brand_update, post_brand_add, get_brand_delete, post_brand_delete } = require('../controllers/brandController');
const { get_all_contacts, get_specific_contact, post_contact_add, post_contact_update, get_contact_delete, post_contact_delete } = require('../controllers/contactsController');
passport.use(loginStrategy)
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});



router.post('/login',passport.authenticate('local', {
  successRedirect: "/panel",
  failureRedirect: "/panel/login"
}))
router.get('/logout', (req, res, next) => {
  req.logout(function(err){
    if(err){
      return next(err)
    }
    res.redirect("/panel")
  })
})
router.get('/login', (req, res, next) => {
  res.render("login")
})

router.use(ensureAuthenticated)

router.get('/', get_all_stats);
router.get('/part', get_all_parts, (req, res, next) => {
  res.render("partsPanel",{
    parts: req.parts
  })
});
router.get("/update/part/:id", get_specific_part, get_all_categories, get_all_brands, (req, res, next) => {
  res.render("partForm",{
    title: "Update a Part",
    part: req.part,
    brands: req.brands,
    categories: req.categories
  })
})
router.get("/add/part", get_all_categories, get_all_brands, (req, res, next) => {
  res.render("partForm",{
    part: {},
    title: "Add a Part",
    brands: req.brands,
    categories: req.categories
  })
})
router.get("/delete/part/:id", get_part_delete)

router.post("/add/part", post_part_add, (req, res, next) => {
  res.redirect("/panel/part")
})
router.post("/update/part/:id", post_part_update,(req, res, next) => {
  res.redirect("/panel/part")
})

router.post("/delete/part/:id", post_part_delete)



router.get('/category', get_all_categories, (req, res, next) => {
  res.render("categoriesPanel",{
    categories: req.categories
  })
})
router.get("/update/category/:id", get_specific_category, (req, res, next) => {
  res.render("categoryForm", {
    category: req.category,
    title: "Update a Category"
  })
})
router.get("/add/category", (req, res, next) => {
  res.render("categoryForm", {
    category: {},
    title: "Add a Category"
  })
})
router.get("/delete/category/:id", get_category_delete)

router.post("/add/category", post_category_add, (req, res, next) => {
  res.redirect("/panel/category")
})
router.post("/update/category/:id", post_category_update,(req, res, next) => {
  res.redirect("/panel/category")
})
router.post("/delete/category/:id", post_category_delete)









router.get('/brand', get_all_brands, (req, res, next) => {
  res.render("brandsPanel", {
    brands: req.brands
  })
})

router.get("/update/brand/:id", get_specific_brand, (req, res, next) => {
  res.render("brandForm", {
    brand: req.brand,
    title: "Update a Brand"
  })
})
router.get("/add/brand/:id", get_specific_brand, (req, res, next) => {
  res.render("brandForm", {
    brand: {},
    title: "Add a Brand"
  })
})
router.get("/delete/brand/:id", get_brand_delete)

router.post("/add/brand", post_brand_add, (req, res, next) => {
  res.redirect("/panel/brand")
})
router.post("/update/brand/:id", post_brand_update,(req, res, next) => {
  res.redirect("/panel/brand")
})
router.post("/delete/brand/:id", post_brand_delete)





router.get('/contact', get_all_contacts, (req, res, next) => {
  res.render("contactsPanel", {
    contacts: req.contacts
  })
})
router.get("/update/contact/:id", get_specific_contact, (req, res, next) => {
  res.render("contactForm", {
    contact: req.contact,
    title: "Update a Contact",
    types: ["phone", "mail", "physical-address"]
  })
})
router.get("/add/contact", get_specific_contact, (req, res, next) => {
  res.render("contactForm", {
    contact: {},
    title: "Add a Contact",
    types: ["phone", "mail", "physical-address"]
  })
})
router.get("/delete/contact/:id", get_contact_delete)
router.post("/add/contact", post_contact_add, (req, res, next) => {
  res.redirect("/panel/contact")
})
router.post("/update/contact/:id", post_contact_update,(req, res, next) => {
  res.redirect("/panel/contact")
})
router.post("/delete/contact/:id", post_contact_delete)











module.exports = router;

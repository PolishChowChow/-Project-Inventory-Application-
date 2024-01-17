function ensureAuthenticated(req, res, next) {
  // Set no-cache headers to prevent caching of the page
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  if (req.isAuthenticated()) {
    next()
    return;
  }
    res.redirect("/panel/login")
    return;
  
}

module.exports = ensureAuthenticated;

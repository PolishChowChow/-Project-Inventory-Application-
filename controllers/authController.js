function ensureAuthenticated(req, res, next) {
  // Set no-cache headers to prevent caching of the page
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware/route
  }

  res.redirect("/panel/login"); // Redirect to the login page if not authenticated
}

module.exports = ensureAuthenticated;

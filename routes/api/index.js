const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const searchRoutes = require("./googleSearch");

// Google Search Routes
router.use("/books", bookRoutes);
router.use("/search", searchRoutes);

// For anything else, render the html page
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;

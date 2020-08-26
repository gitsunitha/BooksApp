const router = require("express").Router();
const searchController = require("../../controllers/googleSearchController");

// Matches with "/api/google"
router.route("/").get(searchController.search);

module.exports = router;

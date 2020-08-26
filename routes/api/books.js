const router = require("express").Router();
const booksController = require("../../controllers/bookController");

// Matches with "/api/books"
router.route("/").get(booksController.findAllBooks);
router.route("/").post(booksController.create);

// Matches with "/api/books/:id"
router.route("/:id").get(booksController.findById);
router.route("/:id").put(booksController.update);
router.route("/:id").delete(booksController.remove);

module.exports = router;

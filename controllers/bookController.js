const db = require("../models");
const BookDb = db.Book;

module.exports = {
  findAllBooks: function (req, res) {
    console.log(req.query);
    BookDb.find({})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    BookDb.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Save Book in the database
    BookDb.create(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(422).send({
          message:
            err.message || "Some error occurred while saving the chosen book.",
        });
      });
  },
  update: function (req, res) {
    BookDb.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    BookDb.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

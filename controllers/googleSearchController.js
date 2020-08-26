const axios = require("axios");

module.exports = {
  search: function (req, res) {
    console.log("test");
    console.log(req);
    const { query: params } = req;
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params,
      })
      .then((results) => {
        res.json(
          results.data.items.filter(
            (result) =>
              result.volumeInfo.title &&
              result.volumeInfo.infoLink &&
              result.volumeInfo.authors &&
              result.volumeInfo.description &&
              result.volumeInfo.imageLinks &&
              result.volumeInfo.imageLinks.thumbnail
          )
        );
      })
      .catch((err) => res.status(422).json(err));
  },
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
  },
  // `description` is required and of type String
  description: {
    type: String,
    required: false,
  },
  // `link` is not required and of type String
  link: {
    type: String,
    required: false,
  }, // `image` is not required and of type String
  image: {
    type: String,
    required: false,
  }, // `authors` is not required and of type Array
  authors: {
    type: Array,
    required: false,
  },
});

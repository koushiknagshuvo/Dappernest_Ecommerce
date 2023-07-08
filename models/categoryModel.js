const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  photo: {
    data: Buffer,
    contentType: String,
  },
  icon: {
    data: Buffer,
    contentType: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);

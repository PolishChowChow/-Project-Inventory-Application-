const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  }
);
CategorySchema.virtual("category_url").get(function () {
  return `/shop/categories/${this.name}`;
});

module.exports = mongoose.model("Category", CategorySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PartSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  amount_in_stock: { type: Number, required: true },
  price: { type: Number, required: true },
},
{ strictPopulate: false }
);
PartSchema.virtual("part_url").get(function () {
  return `/shop/parts/${this._id}`;
});
module.exports = mongoose.model("Part", PartSchema);

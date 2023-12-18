const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PartSchema = new Schema({
    name: { type: String, required: true },
    product_sort_detail: { type: Schema.Types.ObjectId, ref: "PartType"},
    amount_in_stock: { type: Number, required: true },
    price: { type: Number, required: true },
    only_delivery: { type: boolean, default: false }
})
PartSchema.virtual("url").get(function(){
    return `/shop/parts/${this._id}`
})
module.exports = mongoose.model("Part", PartSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartTypeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true},
    category :[{type: Schema.Types.ObjectId, ref: "Category"}],
})

PartTypeSchema.virtual("url").get(function(){
    return `/about/parts/${this._id}`
})
module.exports = mongoose.model("PartType", PartTypeSchema)
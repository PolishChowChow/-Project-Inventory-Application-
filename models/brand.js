const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 150},
    description: { type: String, required: true },
    co_counders: [{type: String, required: false}],
    official_website: {type: String, required: false}
})

BrandSchema.virtual("url").get(function(){
    return `/about/brands/${this._id}`
})

module.exports = mongoose.model("Brand", BrandSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShopInfoSchema = new Schema({
    name: { type: String, required: true },
    nip: { type: String, required: true},
    foundationDate: { type: Date, required: true },
    headOfTHeCompany: { type: String, required: true },
})
module.exports = mongoose.model("ShopInfo", ShopInfoSchema)
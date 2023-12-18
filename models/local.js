const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LocalSchema = new Schema({
    name: { type: String, required: true },
    street_name: {type: String, required: true},
    post_code: {type: String, required: true},
    building_number: { type: String, required: true },
    local_number: { type: String, required: false },
    contact_number: { type: String, required: true },
    email: { type: String, required: true}
})

LocalSchema.virtual("url").get(function(){
    return `/locals/${this._id}`
})

module.exports = mongoose.model("Local", LocalSchema);

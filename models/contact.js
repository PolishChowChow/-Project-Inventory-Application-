const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: "String", required: true },
    contact_type: {
        type: String, 
        enum: ["phone","mail","physical-address"],
        required: true,
    },
    value: { type: String, required: true}
})

module.exports = mongoose.model("Contact", ContactSchema)
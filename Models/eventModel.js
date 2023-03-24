const mongoose = require("mongoose")
const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String ,
    location: String
},{timestamps:true})
const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
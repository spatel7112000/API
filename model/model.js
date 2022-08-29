const mongoose = require('mongoose')

const finalSchema = new mongoose.Schema({
    Name: String,
    Number: String,
    College: String,
    Education: String
})

module.exports = mongoose.model("students", finalSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema(
    {
        name: { type: String, required: true },
        ingredients: { type: [String], required: true },
        instruction: { type: String, required: true },
    }
)

module.exports = mongoose.model('recipes', Recipe)
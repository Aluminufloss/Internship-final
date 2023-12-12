const {Schema, model} = require('mongoose')

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true },
    back: { type: String, required: true },
})

module.exports = model('Book', BookSchema);
const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    imagePath: {type: String, required: true},
    favoriteBooks: [{type: Schema.Types.ObjectId, ref: "Book"}],
    cart: [{type: Schema.Types.ObjectId, ref: "Book"}],
    ratedBooks: [{type: Schema.Types.ObjectId, ref: "Book"}, {type: Number}],
    roles: [{type: String, ref: 'Role'}],
})

module.exports = model('User', UserSchema)

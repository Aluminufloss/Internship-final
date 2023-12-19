const {Schema, model} = require('mongoose')

const CommentSchema = new Schema({
    bookID: { type: Schema.Types.ObjectId, ref: "Book" },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: true },
    date: { type: Date, required: true },
    commentText: {type: String, required: true},
    imagePath: {type: String, required: true},
})

module.exports = model('Comment', CommentSchema);

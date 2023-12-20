const CommentDto = require("../dtos/comment-dto");
const BookModel = require("../models/Book");
const CommentModel = require("../models/Comment");

class BookService {
  async create(bookData) {
    const {
      date,
      title,
      author,
      rating,
      price,
      genre,
      description,
      paperback,
      hardcover,
      amount,
      imagePath,
    } = bookData;

    const book = await BookModel.create({
      date,
      title,
      author,
      rating,
      price,
      genre,
      description,
      imagePath,
      amount,
      paperback,
      hardcover,
    });

    return book.save();
  }

  async getBooks() {
    const books = await BookModel.find({ });
    
    if (!books) {
      throw ApiError.BadRequest("Книги не найдены");
    }

    return books;
  }

  async getBookById(_id) {
    const book = await BookModel.find({ _id });

    if (!book) {
      throw ApiError.BadRequest("Книга по такому id не найдена");
    }

    return book;
  }

  async getComments(bookID) {
    const comments = await CommentModel.find({ bookID });
    return comments;
  }

  async createBookComment(comment, user) {
    const {id, username, imagePath} = user;
    const { bookID, text } = comment;

    const bookComment = await CommentModel.create({ bookID, userID: id, commentText: text, date: new Date(), imagePath, username });
    
    console.log("comm", bookComment);

    return bookComment;
  }
}

module.exports = new BookService();

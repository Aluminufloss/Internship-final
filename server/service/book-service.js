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

  async getBooks(filter, genre) {
    let books = [];

    if (genre) {
      books = await BookModel.find({ genre: genre });
    } else {
      books = await BookModel.find({ });
    }

    if (filter) {
      switch (filter) {
        case "Name":
          books = books.sort((a, b) => a.title.localeCompare(b.title));
          break;

        case "Author name":
          books = books.sort((a, b) => a.author.localeCompare(b.author));
          console.log("2");
          break;

        case "Price":
          books = books.sort((a, b) => a.price > b.price ? -1 : 1);
          console.log("3");
          break;

        case "Rating":
          books = books.sort((a, b) => a.rating > b.rating ? -1 : 1);
          console.log("4");
          break;

        case "Date":
          books = books.sort((a, b) => a.rating > b.rating ? -1 : 1);
          console.log("5");
          break;

        default:
          break;
      }
    }

    return books;
  }

  async getBookById(_id) {
    const book = await BookModel.findOne({ _id });

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

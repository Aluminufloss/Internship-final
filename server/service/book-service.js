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

  async getBooks(filter, genre, page) {
    const limit = 12;
    let books = [];

    if (!page) {
      page = 0;
    } else {
      page = --page;
    }

    if (genre) {
      books = await BookModel.find({ genre: genre }).skip(page * limit).limit(limit);
    } else {
      books = await BookModel.find().skip(page * limit).limit(limit);
    }

    if (filter) {
      switch (filter) {
        case "Name":
          books = books.sort((a, b) => a.title.localeCompare(b.title));
          break;

        case "Author name":
          books = books.sort((a, b) => a.author.localeCompare(b.author));
          break;

        case "Price":
          books = books.sort((a, b) => a.price > b.price ? -1 : 1);
          break;

        case "Rating":
          books = books.sort((a, b) => a.rating > b.rating ? -1 : 1);
          break;

        case "Date":
          books = books.sort((a, b) => a.rating > b.rating ? -1 : 1);
          break;

        default:
          break;
      }
    }

    const nextPage = await BookModel.find().skip((page + 1) * limit + 1).limit(1);

    if (nextPage.length === 0) {
      return { books: books, hasNextPage: false };
    } else {
      return { books: books, hasNextPage: true };
    }
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

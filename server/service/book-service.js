const BookModel = require("../models/Book");

class BookService {
  async create(bookData) {
    const {
      date,
      title,
      author,
      rating,
      price,
      description,
      back,
      amount,
    } = bookData;

    const book = await BookModel.create({
      date,
      title,
      author,
      rating,
      price,
      description,
      back,
      amount,
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
}

module.exports = new BookService();

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
}

module.exports = new BookService();

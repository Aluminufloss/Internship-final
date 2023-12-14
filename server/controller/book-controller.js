const bookService = require("../service/book-service");

class BookContoller {
  async createBook(req, res, next) {
    try {
      const book = await bookService.create(req.body);

      return res.json(book);
    } catch (err) {
      next(err);
    }
  }

  async getBooks(req, res, next) {
    try {
      const books = await bookService.getBooks();
      return res.json(books);
    } catch (err) {
      next(err);
    }
  }

  async getBookById(req, res, next) {
    try {
      const book = await bookService.getBookById(req.body._id);
      return res.json(book[0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookContoller();

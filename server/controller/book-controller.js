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
      const { filter, genre } = req.body;
      const books = await bookService.getBooks(filter, genre);
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

  async getComments(req, res, next) {
    try {
      const comments = await bookService.getComments(req.body.bookID);
      console.log("suska", comments);
      return res.json(comments);
    } catch (err) {
      next(err);
    }
  }

  async createComment(req, res, next) {
    try {
      console.log("dfasdfdfadfadfasdf")
      const comment = await bookService.createBookComment(req.body, req.user);
      return res.json(comment);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookContoller();

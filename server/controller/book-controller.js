const bookService = require("../service/book-service");

class UserContoller {
  async createBook(req, res, next) {
    try {
      const book = await bookService.create(req.body);

      return res.json(book);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserContoller();

const Router = require("express").Router;
const router = new Router();

const { body } = require("express-validator");

const userController = require("../controller/user-controller");
const bookController = require("../controller/book-controller");

const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 32 }),
  userController.registration 
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/getMe", authMiddleware, userController.getMe);
router.post("/upload", userController.uploadImage);
router.post("/refresh", userController.refresh);
router.post("/change", userController.changeInfo);

router.post("/cart", authMiddleware, userController.getCart);

router.post("/favorite", authMiddleware, userController.getFavorite);
router.post("/favoriteAdd", authMiddleware, userController.addFavorite);
router.post("/favoriteDelete", authMiddleware, userController.addFavorite);

router.post("/book", bookController.createBook);
router.post("/getBook", bookController.getBookById);
router.get("/getBooks", bookController.getBooks);

router.post("/comments", bookController.getComments);
router.post("/commentCreate", authMiddleware, bookController.createComment);

module.exports = router;

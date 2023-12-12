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

router.post("/book", bookController.createBook);

module.exports = router;

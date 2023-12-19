module.exports = class UserDto {
  email;
  id;
  username;
  imagePath;
  cart;
  favoriteBooks;
  ratedBooks;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.username = model.username;
    this.imagePath = model.imagePath;
    this.cart = model.cart;
    this.favoriteBooks = model.favoriteBooks;
    this.ratedBooks = model.ratedBooks;
  }
}
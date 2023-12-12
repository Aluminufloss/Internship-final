module.exports = class UserDto {
  email;
  id;
  username;
  imagePath;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.username = model.username;
    this.imagePath = model.imagePath;
  }
}
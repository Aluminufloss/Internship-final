module.exports = class CommentDto {
    userID;
    commentText;
    date;
    imagePath;
    username;
  
    constructor(model) {
      this.userID = model.userID;
      this.username = model.username;
      this.imagePath = model.imagePath;
      this.commentText = model.commentText;
      this.date = model.date;
    }
  }
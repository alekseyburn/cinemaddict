export default class CommentModel {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.emotion = data[`emotion`];
    this.message = data[`comment`];
    this.date = data[`date`];
    console.log(this.message);
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}

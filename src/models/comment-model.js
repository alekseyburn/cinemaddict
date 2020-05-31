export default class CommentModel {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.emotion = data[`emotion`];
    this.message = data[`comment`];
    this.date = new Date(data[`date`]);
  }

  toRAW() {
    return {
      "id": this.id,
      "author": this.author,
      "emotion": this.emotion,
      "comment": this.message,
      "date": this.date.toISOString(),
    };
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}

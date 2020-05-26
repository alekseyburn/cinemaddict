import CommentComponent from '../components/comment-component';
import {render} from '../utils/dom';


export default class CommentController {
  constructor(container) {
    this._container = container.querySelector(`.film-details__comments-list`);

    this._commentComponent = null;
  }

  render(comment) {
    this._commentComponent = new CommentComponent(comment);
    render(this._container, this._commentComponent);
  }
}

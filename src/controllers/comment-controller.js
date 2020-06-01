import CommentComponent from '../components/comment-component';
import {render, replace, remove} from '../utils/dom';


const SHAKE_ANIMATION_TIMEOUT = 600;


export default class CommentController {
  constructor(container, onCommentDataChange) {
    this._container = container.querySelector(`.film-details__comments-list`);
    this._onCommentDataChange = onCommentDataChange;
    this._commentComponent = null;
  }

  render(comment) {
    const oldCommentComponent = this._commentComponent;
    this._commentComponent = new CommentComponent(comment);

    this._commentComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onCommentDataChange(this, comment, null);
    });

    if (oldCommentComponent) {
      replace(this._commentComponent, oldCommentComponent);
    } else {
      render(this._container, this._commentComponent);
    }
  }

  startDeleting() {
    this._commentComponent.startDeleting();
  }

  stopDeleting() {
    this._commentComponent.stopDeleting();
    this._commentComponent
      .getElement().classList.add(`shake`);

    setTimeout(() => {
      this._commentComponent
        .getElement().classList.remove(`shake`);
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  destroy() {
    remove(this._commentComponent);
  }
}

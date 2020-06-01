import AbstractComponent from "./abstract-component";
import {formatCommentDate} from '../utils/time';


const getCommentMarkup = (comment) => {
  const {
    author,
    date,
    emotion,
    message,
  } = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};


export default class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return getCommentMarkup(this._comment);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, handler);
  }

  startDeleting() {
    const deleteButton = this.getElement()
      .querySelector(`.film-details__comment-delete`);
    deleteButton.innerHTML = `Deleting...`;
    deleteButton.disabled = true;
  }

  stopDeleting() {
    const deleteButton = this.getElement()
    .querySelector(`.film-details__comment-delete`);
    deleteButton.innerHTML = `Delete`;
    deleteButton.disabled = false;
  }
}

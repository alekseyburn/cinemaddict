import FilmCardComponent from '../components/film-card-component';
import FilmPopupComponent from '../components/film-popup-component';
import CommentsModel from '../models/comments-model';
import CommentController from './comment-controller';
import FilmModel from '../models/film-model';
import {render, remove, replace} from '../utils/dom';
import {encode} from 'he';
import CommentModel from '../models/comment-model';


const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._filmData = null;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._commentsModel = new CommentsModel();
    this._commentControllers = [];

    this._escKeyHandler = this._escKeyHandler.bind(this);
    this._ctrlEnterKeyHandler = this._ctrlEnterKeyHandler.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
  }

  render(film) {
    this.setFilmData(film);

    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(this._filmData);

    this._filmCardComponent.setClickHandler(() => {
      this._renderFilmPopup();
    });

    this._filmCardComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      const newData = FilmModel.clone(this._filmData);
      newData.isAddedToWatchlist = !newData.isAddedToWatchlist;
      this._onDataChange(this, this._filmData, newData);
    });

    this._filmCardComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      const newData = FilmModel.clone(this._filmData);
      newData.isMarkedAsWatched = !newData.isMarkedAsWatched;
      newData.watchingDate = new Date(Date.now());
      this._onDataChange(this, this._filmData, newData);
    });

    this._filmCardComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      const newData = FilmModel.clone(this._filmData);
      newData.isFavorite = !newData.isFavorite;
      this._onDataChange(this, this._filmData, newData);
    });

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeFilmPopup();
    }
  }

  setFilmData(data) {
    this._filmData = FilmModel.clone(data);
    if (this._filmPopupComponent) {
      this._filmPopupComponent.update({
        isAddedToWatchlist: this._filmData.isAddedToWatchlist,
        isFavorite: this._filmData.isFavorite,
        isMarkedAsWatched: this._filmData.isMarkedAsWatched,
      });
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    this._removeFilmPopup();
  }

  shake() {
    if (this._filmCardComponent) {
      this._filmCardComponent.shake();
    }
    if (this._filmPopupComponent) {
      this._filmPopupComponent.shake();
    }
  }

  _renderFilmPopup() {
    this._onViewChange();

    this._filmPopupComponent = new FilmPopupComponent(this._filmData);

    this._filmPopupComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      const newData = FilmModel.clone(this._filmData);
      newData.isAddedToWatchlist = !newData.isAddedToWatchlist;
      this._onDataChange(this, this._filmData, newData, false);
    });

    this._filmPopupComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      const newData = FilmModel.clone(this._filmData);
      newData.isMarkedAsWatched = !newData.isMarkedAsWatched;
      newData.watchingDate = new Date(Date.now());
      this._onDataChange(this, this._filmData, newData, false);
    });

    this._filmPopupComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      const newData = FilmModel.clone(this._filmData);
      newData.isFavorite = !newData.isFavorite;
      this._onDataChange(this, this._filmData, newData, false);
    });

    this._filmPopupComponent.setCloseButtonClickHandler(() => {
      this._removeFilmPopup();
    });

    document.body.classList.add(`hide-overflow`);
    render(document.querySelector(`.footer`), this._filmPopupComponent, `afterend`);
    document.addEventListener(`keydown`, this._escKeyHandler);
    document.addEventListener(`keydown`, this._ctrlEnterKeyHandler);
    this._mode = Mode.POPUP;

    this._api.getComments(this._filmData.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._renderComments(this._commentsModel.getComments());
      });
  }

  _removeFilmPopup() {
    if (this._mode === Mode.POPUP) {
      const newData = FilmModel.clone(this._filmData);
      this._onDataChange(
          this,
          this._filmData,
          newData
      );
      remove(this._filmPopupComponent);
      document.body.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, this._escKeyHandler);
      document.removeEventListener(`keydown`, this._ctrlEnterKeyHandler);
      this._mode = Mode.DEFAULT;
    }
  }

  _renderComments(comments) {
    const commentsControllers = comments.map((comment) => {
      const commentController = new CommentController(
          this._filmPopupComponent.getElement(),
          this._onCommentsDataChange
      );
      commentController.render(comment);
      return commentController;
    });

    this._commentControllers = commentsControllers;
  }

  _updateComments() {
    this._commentControllers.forEach((commentController) =>
      commentController.destroy());
    this._commentControllers = [];
    this._renderComments(this._commentsModel.getComments());
  }

  _onCommentsDataChange(commentController, oldComment, newComment) {
    if (newComment === null) {
      commentController.startDeleting();
      this._api.removeComment(oldComment.id)
        .then(() => {
          const isCommentRemoved = this._commentsModel.removeComment(oldComment.id);

          if (isCommentRemoved) {
            this._updateComments();
            this._filmPopupComponent.update({
              commentsCount: this._commentsModel.getComments().length
            });
          }
        })
        .catch(() => {
          commentController.stopDeleting();
        });
    } else {
      this._filmPopupComponent.blockInput();
      this._api.addComment(this._filmData.id, newComment)
        .then((comments) => {
          this._commentsModel.setComments(comments);
          this._updateComments();

          this._filmPopupComponent.update({
            commentsCount: this._commentsModel.getComments().length,
            currentCommentEmoji: null
          });
          this._filmPopupComponent.unblockInput(false);
        })
        .catch(() => {
          this.shake();
          this._filmPopupComponent.unblockInput(true);
        });
    }
  }

  _escKeyHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Ecs`) {
      this._removeFilmPopup();
    }
  }

  _ctrlEnterKeyHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && (evt.key === `Enter`)) {
      const message = encode(this._filmPopupComponent.getCurrentCommentText());
      const emotion = this._filmPopupComponent.getCurrentCommentEmoji();

      if (message && emotion) {
        const newComment = new CommentModel({
          date: new Date(Date.now()),
          emotion,
          comment: message,
        });

        this._onCommentsDataChange(null, null, newComment);
      }
    }
  }
}

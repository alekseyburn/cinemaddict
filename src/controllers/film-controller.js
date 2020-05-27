import FilmCardComponent from '../components/film-card-component';
import FilmPopupComponent from '../components/film-popup-component';
import CommentsModel from '../models/comments-model';
import CommentController from './comment-controller';
import {render, remove, replace} from '../utils/dom';
import {getRandomFullName} from '../utils/random';
import {encode} from 'he';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange, filmsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmsModel = filmsModel;
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
    this._filmData = Object.assign({}, film);
    this._commentsModel.setComments(film.comments);

    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(this._filmData);


    this._filmCardComponent.setClickHandler(() => {
      this._renderFilmPopup();
    });

    this._filmCardComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(
          this,
          this._filmData,
          Object.assign({}, this._filmData, {isAddedToWatchlist: !this._filmData.isAddedToWatchlist})
      );
    });

    this._filmCardComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(
          this,
          this._filmData,
          Object.assign({}, this._filmData, {isMarkedAsWatched: !this._filmData.isMarkedAsWatched})
      );
    });

    this._filmCardComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(
          this,
          this._filmData,
          Object.assign({}, this._filmData, {isFavorite: !this._filmData.isFavorite})
      );
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

  destroy() {
    remove(this._filmCardComponent);
    this._removeFilmPopup();
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

  _onCommentsDataChange(oldComment, newComment) {
    if (newComment === null) {
      const isCommentRemoved = this._commentsModel.removeComment(oldComment.id);
      if (isCommentRemoved) {
        this._updateComments();
        this._onDataChange(
            this,
            this._filmData,
            Object.assign(
                {},
                this._filmData,
                {comments: this._commentsModel.getComments()}
            )
        );
      }
    } else {
      const isCommentAdded = this._commentsModel.addComment(newComment);
      if (isCommentAdded) {
        this._updateComments();
        this._onDataChange(
            this,
            this._filmData,
            Object.assign(
                {},
                this._filmData,
                {comments: this._commentsModel.getComments()}
            )
        );
      }
    }

    this._filmPopupComponent.update({
      commentsCount: this._commentsModel.getComments().length
    });
  }

  _renderFilmPopup() {
    this._onViewChange();

    this._filmPopupComponent = new FilmPopupComponent(this._filmData);

    this._filmPopupComponent.setAddToWatchlistClickHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {isAddedToWatchlist: !this._filmData.isAddedToWatchlist}));
    });

    this._filmPopupComponent.setMarkAsWatchedClickHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {isMarkedAsWatched: !this._filmData.isMarkedAsWatched}));
    });

    this._filmPopupComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {isFavorite: !this._filmData.isFavorite}));
    });

    this._filmPopupComponent.setCloseButtonClickHandler(() => {
      this._removeFilmPopup();
    });

    render(document.querySelector(`.footer`), this._filmPopupComponent, `afterend`);

    this._renderComments(this._commentsModel.getComments());
    document.addEventListener(`keydown`, this._escKeyHandler);
    document.addEventListener(`keydown`, this._ctrlEnterKeyHandler);
    this._mode = Mode.POPUP;
  }

  _removeFilmPopup() {
    if (this._mode === Mode.POPUP) {
      remove(this._filmPopupComponent);
      document.removeEventListener(`keydown`, this._escKeyHandler);
      document.removeEventListener(`keydown`, this._ctrlEnterKeyHandler);
      this._mode = Mode.DEFAULT;
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
        const newComment = {
          id: String(new Date() + Math.random()),
          author: getRandomFullName(),
          date: new Date(Date.now()),
          emotion,
          message,
        };

        this._onCommentsDataChange(null, newComment);
      }
    }
  }
}

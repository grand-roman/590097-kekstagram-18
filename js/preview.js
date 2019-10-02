'use strict';

(function () {

  var DISPLAY_COMMENTS = 5;

  var bigPicture = document.querySelector('.big-picture');
  var socialLoader = document.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.social__comment-count');
  socialLoader.classList.add('visually-hidden');
  commentsCount.classList.add('visually-hidden');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  function createComment(comment) {
    var commentElement = commentTemplate.cloneNode(true);
    return commentElement;
  }

  function renderComments(comments) {
    var commentsList = bigPicture.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var comment = createComment(comments[i]);
      if (i >= DISPLAY_COMMENTS) {
        comment.classList.add('visually-hidden');
      }
      fragment.appendChild(comment);
    }
    commentsList.appendChild(fragment);
  }

  function renderBigPicture(photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    renderComments(photo.comments);
  }

  window.preview = {
    renderBigPicture: renderBigPicture
  };

})();

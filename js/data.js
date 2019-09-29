'use strict';

(function () {

  var DESCRIPTIONS = 'Sunflower';

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var PHOTOS_COUNT = 25;

  var Like = {
    MIN: 15,
    MAX: 200
  };

  function getRandomComment() {
    var comment = window.util.getRandomElement(COMMENTS);
    if (Math.random() >= 0.5) {
      comment += ' ' + window.util.getRandomElement(COMMENTS);
    }
    return comment;
  }

  function getComments() {
    var comments = [];
    for (var i = 0; i < window.util.getRandomNumber(1, 10); i++) {
      comments[i] = getRandomComment();
    }
    return comments;
  }

  window.data = {
    generatePhotos: function () {
      var photos = [];
      for (var i = 0; i < PHOTOS_COUNT; i++) {
        photos[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: window.util.getRandomNumber(Like.MIN, Like.MAX),
          comments: getComments(),
          description: DESCRIPTIONS
        };
      }
      return photos;
    }
  };

})();


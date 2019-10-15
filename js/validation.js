'use strict';

(function () {

  var Hashtag = {
    QUANITY: 5,
    HASH_SYMBOL: '#',
    MAX_LENGTH: 20
  };

  var Descriptions = {
    MAX_LENGTH: 140
  };

  var uploadElement = document.querySelector('.img-upload');
  var uploadSubmitElement = uploadElement.querySelector('.img-upload__submit');
  var hashtagElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');

  function checkRepeatHashtags(hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      var currentHashtag = hashtags[i];
      for (var j = 0; j < hashtags.length; j++) {
        if (currentHashtag === hashtags[j] && i !== j) {
          return true;
        }
      }
    }
    return false;
  }

  function highlightInvalidField(field) {
    field.style.outline = !field.validity.valid ? '2px solid red' : 'none';
  }

  function hashtagValidity() {
    var errorMessage = '';
    var hashtagValue = hashtagElement.value.trim();

    if (hashtagValue === '') {
      hashtagElement.setCustomValidity(errorMessage);
      hashtagElement.style.outline = 'none';
      return;
    }

    var hashtags = hashtagValue.toLowerCase().split(' ');
    hashtags.forEach(function (hashtagItem) {
      if (hashtagItem.charAt(0) !== Hashtag.HASH_SYMBOL) {
        errorMessage = 'Хэштег должен начинаться с символа #';
        highlightInvalidField(hashtagElement);
      } else if (hashtagItem.indexOf(Hashtag.HASH_SYMBOL, 1) > 1) {
        errorMessage = 'Хэш-теги разделяются пробелами';
        highlightInvalidField(hashtagElement);
      } else if (hashtagItem.charAt(0) === Hashtag.HASH_SYMBOL && hashtagItem.length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки';
        highlightInvalidField(hashtagElement);
      } else if (hashtags.length > Hashtag.QUANITY) {
        errorMessage = 'Допустимое количество  хэштегов  не более 5';
        highlightInvalidField(hashtagElement);
      } else if (hashtagItem.length > Hashtag.MAX_LENGTH) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
        highlightInvalidField(hashtagElement);
      } else if (checkRepeatHashtags(hashtags)) {
        errorMessage = 'Хэштеги не должны повторяться';
        highlightInvalidField(hashtagElement);
      } else {
        hashtagElement.style.outline = 'none';
      }
    });

    hashtagElement.setCustomValidity(errorMessage);
    hashtagElement.reportValidity();
  }

  function descriptionValidity() {
    var errorMessage = '';
    var descriptionValue = descriptionElement.value.trim();

    if (descriptionValue === '') {
      descriptionElement.setCustomValidity(errorMessage);
      descriptionElement.style.outline = 'none';
      return;
    }
    var descriptions = descriptionValue.toLowerCase().split(' ');
    descriptions.forEach(function (descriptionItem) {
      if (descriptionItem.length > Descriptions.MAX_LENGTH) {
        errorMessage = 'Максимальная длина комментария 140 символов';
        highlightInvalidField(descriptionElement);
      } else {
        descriptionElement.style.outline = 'none';
      }
    });
    descriptionElement.setCustomValidity(errorMessage);
    descriptionElement.reportValidity();

  }

  function setDefaultValidation() {
    hashtagElement.value = '';
    descriptionElement.value = '';
    hashtagElement.style.outline = 'none';
  }

  hashtagElement.addEventListener('input', hashtagValidity);
  descriptionElement.addEventListener('input', descriptionValidity);

  uploadSubmitElement.addEventListener('click', function () {
    highlightInvalidField(hashtagElement);
    highlightInvalidField(descriptionElement);
  });

  uploadSubmitElement.addEventListener('submit', function () {
    highlightInvalidField(hashtagElement);
    highlightInvalidField(descriptionElement);
  });

  window.validation = {
    setDefaultValidation: setDefaultValidation,
  };

})();

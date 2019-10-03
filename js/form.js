'use strict';

(function () {

  var uploadElement = document.querySelector('.img-upload');
  var uploadFileElement = uploadElement.querySelector('#upload-file');
  var uploadSendButtonElement = uploadElement.querySelector('.img-upload__submit');
  var uploadPopupElement = uploadElement.querySelector('.img-upload__overlay');
  var uploadPopupCloseElement = uploadElement.querySelector('#upload-cancel');

  var hashtagElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');

  var formElement = document.querySelector('.img-upload__form');
  var uploadFormSelectElement = document.querySelector('#upload-select-image');

  function closeForm() {
    uploadPopupElement.classList.add('hidden');
    uploadFileElement.value = null;
    document.removeEventListener('keydown', onFormEscPress);
  }

  function openForm() {
    uploadPopupElement.classList.remove('hidden');
    uploadSendButtonElement.disabled = false;
    document.addEventListener('keydown', onFormEscPress);
  }

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  uploadFormSelectElement.addEventListener('change', function () {
    openForm();
  });

  uploadPopupCloseElement.addEventListener('click', function () {
    closeForm();
  });

  hashtagElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  hashtagElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  descriptionElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  descriptionElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  var onError = function (errorMessage) {
    closeForm();
    window.error.show(errorMessage);
  };

  var onSuccess = function () {
    closeForm();
    window.success.show();
  };

  uploadSendButtonElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.inBackend.upload(new FormData(formElement), onSuccess, onError);
    uploadSendButtonElement.disabled = true;
  });

})();

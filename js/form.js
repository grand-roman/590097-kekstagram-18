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
    window.scale.setDefaultScale();
    window.effects.setDefaultEffect();
    window.validation.setDefaultValidation();
    document.removeEventListener('keydown', onFormEscPress);
  }

  function openForm() {
    uploadPopupElement.classList.remove('hidden');
    uploadSendButtonElement.disabled = false;
    window.scale.setDefaultScale();
    document.addEventListener('keydown', onFormEscPress);
  }

  function onFormEscPress(evt) {
    window.util.isEscEvent(evt, closeForm);
  }

  uploadFormSelectElement.addEventListener('change', function () {
    openForm();
    window.fileReader.init();
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

  function onError(errorMessage) {
    closeForm();
    window.error.show(errorMessage);
    window.scale.setDefaultScale();
    window.effects.setDefaultEffect();
    window.validation.setDefaultValidation();
  }

  function onSuccess() {
    closeForm();
    window.success.show();
    window.scale.setDefaultScale();
    window.effects.setDefaultEffect();
    window.validation.setDefaultValidation();
  }

  uploadSendButtonElement.addEventListener('click', function (evt) {
    if (!hashtagElement.validity.valid && !descriptionElement.validity.valid) {
      window.inBackend.upload(new FormData(formElement), onSuccess, onError);
      uploadSendButtonElement.disabled = true;
      evt.preventDefault();
    }
  });

})();

'use strict';

(function () {

  var ScaleValue = {
    MIN: 25,
    STEP: 25,
    MAX: 100,
    DEFAULT: 100
  };

  var uploadElement = document.querySelector('.img-upload');
  var scaleElement = uploadElement.querySelector('.img-upload__scale');
  var scaleValueElement = scaleElement.querySelector('.scale__control--value');
  var scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
  var scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
  var imgPreviewElement = uploadElement.querySelector('.img-upload__preview img');

  function setDefaultScale() {
    scaleValueElement.value = 100 + '%';
    imgPreviewElement.style = '';
  }

  function setPhotoScale(value) {
    var currentScale = parseInt(scaleValueElement.value, 10);
    currentScale += ScaleValue.STEP * value;
    if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
      scaleValueElement.value = currentScale + '%';
      imgPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
    }
    return currentScale;
  }

  scaleSmallerElement.addEventListener('click', function () {
    setPhotoScale(-1);
  });

  scaleBiggerElement.addEventListener('click', function () {
    setPhotoScale(1);
  });

  window.scale = {
    setDefaultScale: setDefaultScale
  };

})();

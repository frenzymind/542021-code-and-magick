'use strict';

window.dialog = (function () {

  var inventory = document.querySelector('div.overlay.setup.hidden');
  var dialogHandle = inventory.querySelector('.setup-user-pic');

  dialogHandle.style.zIndex = 1000;

  function onDialogHandleMousedown(evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      inventory.style.top = (inventory.offsetTop - shift.y) + 'px';
      inventory.style.left = (inventory.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function init() {

    dialogHandle.addEventListener('mousedown', onDialogHandleMousedown);
  }

  init();

})();

'use strict';

window.colorizeElement = (function() {

  function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return {

    colorizeElement: function(elem, array, callbackFunction) {

      var min = 0;
      var max = array.length;

      var randomId = generateRandomInt(min, max);

      var color = array[randomId];

      callbackFunction(elem, color);
    }
  };
})();

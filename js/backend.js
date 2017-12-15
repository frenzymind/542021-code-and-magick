'use strict';

window.backend = (function () {

  return {

    load: function (onLoad, onError) {

      var SERVER_URL = 'https://1510.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.open('GET', SERVER_URL);

      xhr.addEventListener('load', function () {

        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }

      });

      xhr.addEventListener('error', function () {

        onError('Ошибка соединения!');

      });

      xhr.send();

    },
    save: function (data, onLoad, onError) {

      var SERVER_URL = 'https://1510.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();

      xhr.open('POST', SERVER_URL);

      xhr.addEventListener('load', function () {

        if (xhr.status === 200) {
          onLoad();
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }

      });

      xhr.addEventListener('error', function () {

        onError('Ошибка соединения!');

      });

      xhr.send(data);

    }
  };

})();

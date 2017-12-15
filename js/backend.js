'use strict';

window.backend = (function () {

  return {

    load: function (onLoad, onError) {

      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.open('GET', 'https://1510.dump.academy/code-and-magick/data');

      xhr.addEventListener('load', function () {

        switch (xhr.status) {

          case 200:
            onLoad(xhr.response);
            break;

          default:
            onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }

      });

      xhr.addEventListener('error', function () {

        onError('Ошибка соединения!');

      });

      xhr.send();

    },
    save: function (data, onLoad, onError) {

      var xhr = new XMLHttpRequest();

      xhr.open('POST', 'https://1510.dump.academy/code-and-magick');

      xhr.addEventListener('load', function () {

        switch (xhr.status) {

          case 200:
            onLoad();
            break;

          default:
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

'use strict';

function drawText(text, x, y, ctx, style) {

   ctx.fillStyle = style;
   ctx.fillText(text, x, y);

   return;
}

function drawRect(x, y, width, height, ctx, style) {

   ctx.fillStyle = style;
   ctx.fillRect(x, y, width, height);

   return;
}

window.renderStatistics = function(ctx, names, times) {
    var x = 100;
    var y = 10;
    var width = 420;
    var heigh = 270;
    var offSet = 10;
    var offSetTextX = 15;
    var offSetTextY = 30;
    var titleTextLevel1 = 'Ура вы победили!';
    var titleTextLevel2 = 'Список результатов:';
    var lineParagraphFactor = 1.6;
    var style = 'black';

    style = 'rgba(0, 0, 0, 0.7)';
    drawRect(x + offSet, y + offSet, width, heigh, ctx, style);

    style = 'white';
    drawRect(x, y, width, heigh, ctx, style);

    ctx.font = '16px PT Mono';

    style = 'black';
    drawText(titleTextLevel1, x + offSetTextX, y + offSetTextY, ctx, style);

    drawText(titleTextLevel2, x + offSetTextX, y + offSetTextY * lineParagraphFactor, ctx, style);

    var gistStartX = 150;
    var gistStartY = 240;
    var gistWidth = 40;
    var gistHeight = 150;
    var gistDistance = 50;
    var gistTextTopOffSet = -5;
    var gistTextBotOffSet = 15;

    for (var i = 0; i < names.length; i++) {

      if (names[i] === 'Вы') {
        style = 'rgba(255, 0, 0, 1)';
      }
      else {
        style = 'rgba(0, 30, 255,'+ Math.random() +')';
      }

      var posX = gistStartX + (gistWidth + gistDistance) * i;
      var max = Math.max.apply(null, times);
      var gistValue = Math.round(times[i] * gistHeight / max);

      drawRect(posX, gistStartY, gistWidth, -gistValue, ctx, style);

      style = 'black';
      drawText(names[i], posX, gistStartY + gistTextBotOffSet, ctx, style);
      drawText(Math.round(times[i]), posX, gistStartY - gistValue + gistTextTopOffSet, ctx, style);
    }

 }




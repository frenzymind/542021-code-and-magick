'use strict';

function drawText(text, x, y, ctx, style) {

   ctx.fillStyle = style;
   ctx.fillText(text, x, y);

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

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x + offSet, y + offSet, width, heigh);

    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, heigh);

    ctx.font = '16px PT Mono';
    //ctx.fillStyle = 'black';
    //ctx.fillText(titleTextLevel1, x + offSetTextX, y + offSetTextY);
    drawText(titleTextLevel1, x + offSetTextX, y + offSetTextY, ctx, style);

    //ctx.fillText(titleTextLevel2, x + offSetTextX, y + offSetTextY * 1.6);
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

      ctx.fillStyle = style;
      ctx.fillRect(posX, gistStartY, gistWidth, -gistValue);

      style = 'black';
      //ctx.fillText(names[i], posX, gistStartY + gistTextBotOffSet);
      drawText(names[i], posX, gistStartY + gistTextBotOffSet, ctx, style);
      //ctx.fillText(Math.round(times[i]), posX, gistStartY - gistValue + gistTextTopOffSet);
      drawText(Math.round(times[i]), posX, gistStartY - gistValue + gistTextTopOffSet, ctx, style);
    }

 }




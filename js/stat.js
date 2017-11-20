window.renderStatistics = function(ctx, names, times) {
    var x = 100;
    var y = 10;
    var width = 420;
    var heigh = 270;
    var offSet = 10;
    var titleTextLevel1 = 'Ура вы победили!';
    var titleTextLevel2 = 'Список результатов:';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x + offSet, y + offSet, width, heigh);

    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, heigh);

    ctx.font = '16px PT Mono';
    ctx.fillStyle = 'black';
    ctx.fillText(titleTextLevel1, x + offSet, y + offSet * 4);

    ctx.fillText(titleTextLevel2, x + offSet, y + offSet * 6);
  }
'use strict';
angular.module('nback', [])
.factory('GameService', function(GridService, $timeout){
  var game = {};

  //grid dimensions
  var dimX = GridService.size.x;
  var dimY = GridService.size.y;

  //game defaults
  var _n = 3;
  var _m = 1;
  var _interval = 2.5;
  var _ticks = 20;

  //game state info
  var tickIds = [];
  var currentScore = {correct: 0, incorrect: 0};
  var runGame = false;

  var selectRandom = function(num){
    num = Math.floor(Math.random()*num);
    return num;
  };

  game.startGame = function(ticks, n, m, interval){
    runGame = true;
    ticks = ticks       || _ticks;
    n =  n              || _n;
    m = m               || _m;
    interval = interval || _interval;
    var series = [];
    var x, y;

    var gameTick = function(){
      if( ticks-- && runGame){
        GridService.reset();
        x = selectRandom(dimX);
        y = selectRandom(dimY);

        series.push({x:x, y:y});
        GridService.activate(x, y);
        tickIds.push(setInterval(gameTick, interval));
      } else {
        this.endGame();
      }
    };
    gameTick();
  };

  game.move = function(key){

  };

  game.endGame = function(){
    //if any remaining ticks, clear them
    if (!runGame) return; // game was not running

    runGame = false;
    tickIds.forEach(function(id){
      clearTimeout(id);
    });
    tickIds = []; //reset tickIds array
  };

  return game;
});

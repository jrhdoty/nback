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

  var initializeSeries = function(m){
    var series = [];
    for ( var i = 0; i < m; i++ ){
      series.push([]);
    }
    return series;
  };

  game.startGame = function(ticks, n, m, interval){
    runGame = true;
    ticks = ticks       || _ticks;
    n =  n              || _n;
    m = m               || _m;
    interval = interval || _interval;
    var series = initializeSeries(m);
    var x, y;
    var that = this;

    var gameTick = function(){
      if( ticks-- && runGame){
        GridService.reset();
        for ( var i = 0; i < m; i++ ){
          x = selectRandom(dimX);
          y = selectRandom(dimY);
          series[i].push({x:x, y:y});
          GridService.activate(i, x, y);
        }
        tickIds.push($timeout(gameTick, interval));
      } else {
        that.endGame();
      }
    };
    gameTick();
  };

  game.move = function(m, val){

  };

  game.endGame = function(){
    //if any remaining ticks, clear them
    if (!runGame) return; // game was not running

    runGame = false;
    tickIds.forEach(function(tick){
      $timeout.cancel(tick);
    });
    tickIds = []; //reset tickIds array
  };

  return game;
});

'use strict';
angular.module('nback', [])
.factory('GameService', function(GridService, $timeout){
  var game = {};

  //grid dimensions
  var dimX, dimY; 
  dimX = dimY = GridService.dimensions();

  //game defaults
  var n_default = 3;
  var m_default = 1;
  var interval_default = 2.5;
  var ticks_default = 20;

  //game state info
  var tickIds,
      ticks,
      interval,
      currentScore,
      runGame,
      series, 
      guesses, 
      n, 
      m;

  var selectRandom = function(num){
    return Math.floor(Math.random()*num);
  };

  var initializeSeries = function(m){
    return Array.apply(null, Array(m)).map(function(){return 0});
  };

  game.settings = function(_ticks, _n, _m, _interval){
    ticks = _ticks       || ticksDefault;    //number of ticks
    n     = _n           || nDefault;        //how far back
    m     = _m           || mDefault;        //how many dimensions
    interval = _interval || intervalDefault; //interval between ticks
    series  = initializeSeries(m);    //initialize game history
    guesses = initializeSeries(m);    //initialize guess history
    currentScore = {correct: 0, incorrect: 0, missed: 0};
  };

  game.run = function(ticks, n, m, interval){
    runGame = true;
    var x, y, val;
    var that = this;

    var gameTick = function(){
      if( ticks-- && runGame){
        GridService.reset();  //clear current selections
        for ( var i = 0; i < m; i++ ){ //for each dim
          x = selectRandom(dimX);
          y = selectRandom(dimY);
          val = selectRandom(dimX*dimY);
          series[i].push({x:x, y:y});
          GridService.activate(i, val, x, y); //activate dim at random (x, y)
        }
        tickIds.push($timeout(gameTick, interval)); //save promises in case we want to reset
      } else {
        that.endGame();
      }
    };
    gameTick();
  };
  

  game.move = function(m){
    //does latest series[m][latest] === series[m][latest-n]
    if (series[m].length < n) return false;
    if (series[m][series[m].length-1] === series[m][series[m].length-1-n]) return true;
    return false;
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

angular.module('score', [])
.factory('scoreService', function(){
  var currentScore;
  var ticks;
  var score = {};

  var initializeScoreArray = function(n){
    Array.apply(null, Array(n)).map(function(){return 0});
  };

  score.init = function(dim){
    currentScore = {correct: initializeScoreArray(dim), 
                    incorrect: initializeScoreArray(dim), 
                    missed: initializeScoreArray(dim)};
  };

  score.updateScore = function(dim, type){
    if(type) currentScore[type][dim]++;
    
  };

  score.getCurrentScore = function(){
    return currentScore;
  };
});
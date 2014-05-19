'use strict';

angular.module('nbackApp')
  .controller('GameCtrl', function ($scope) {
    console.log('Hit Game Controller');
    //setup the dimensions of the game
    $scope.game = {};

    var game = $scope.game;

    $scope.game.config = {
      dimX : 3,
      dimY : 3,
      sequenceLength : 2,
      gameLength : 10,
      timeLapse : 3
    };

    //define Tile class
    $scope.game.Tile = function(){
      this.state = false;
    };

    //define Board class
    $scope.game.Board = function(x, y){
      this.x = x;
      this.y = y;
      this.board = [];
      for (var i = 0; i < this.y; i ++){
        this.board.push([]);
        for (var j = 0; j < this.x; j++){
          this.board[i].push(new $scope.game.Tile());
        }
      }
    };

    //create board
    $scope.game.board = new game.Board(3, 3);

    //play function
    //stop

    //game parameters
      //sequence length
      //number of full sequences to show
      //time between sequence items

    //game state
      //sequence
      //score
        //correct
        //incorrect

    //game events
      //show next seq item
      //user input
        //auditory
        //visual
      //user input match
        //success
        //fail
    });

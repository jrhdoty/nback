'use strict';

angular.module('nbackApp')
  .controller('GameCtrl', function ($scope, $interval) {
    console.log('Hit Game Controller');
    //setup the dimensions of the game
    $scope.game = {};

    var game = $scope.game;

    game.config = {
      dimX : 3,
      dimY : 3,
      sequenceLength : 2,
      gameLength : 10,
      timeLapse : 3
    };

    //define Tile class
    game.Tile = function(){
      this.active = false;
    };

    //define Board class
    game.Board = function(x, y){
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

    //reset all tiles to off
    game.Board.prototype.reset = function(){
      _.each(this.board, function(row){
        _.each(row, function(tile){
          tile.active = false;
        });
      });
    };

    //select a random tile
    game.Board.prototype.getRandomTile = function(){
      var i = Math.floor(Math.random()*this.board.length);
      var j = Math.floor(Math.random()*this.board[0].length);
      return this.board[i][j];
    };

    //turn a random tile on
    game.Board.prototype.activateRandomTile = function(){
      var tile = this.getRandomTile();
        tile.active = true;
        return tile;
    };

    //define sequence class
    game.Sequence = function(){
      this.seq = [];
    };

    game.Sequence.prototype.add = function(val){
      this.seq.push(val);
    };

    game.Sequence.prototype.match = function(n){
      if (this.seq.length < n+1){
        return false;
      }
      if(this.seq[this.seq.length-1] === this.seq[this.seq.length-(1+n)]){
        return true;
      }
      return false;
    };

    //define Game class
    game.Game = function(board){
      this.board = board;
    };

    game.Game.prototype.play = function(n, gameLength){
      var self = this;
      var seq = new game.Sequence();


      var nextRound = function(){
        self.board.reset();
        seq.add(self.board.activateRandomTile());
        console.log(seq.match(n));
      };

      $interval(function(){
        nextRound();
      }, 2000, n+gameLength);

    };

    //create board
    game.board = new game.Board(3, 3);
    var g = new game.Game(game.board);
    g.play(2, 20);
    // game.board.reset();    


    //for the game loop use $interval
    //angular native loop

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

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
    game.Game = function(board, n){
      this.board = board;
      this.seq = new game.Sequence();
      this.correctGuesses   = 0;
      this.incorrectGuesses = 0;
      this.missedGuesses    = 0;
      this.n = n;
      this.playerGuessed = false;
    };

    game.Game.prototype.play = function(gameLength){
      var self = this;
      console.log('gameLength is: ', gameLength);
      var self = this;

      var nextRound = function(){
        self.board.reset();
        self.seq.add(self.board.activateRandomTile());
      };

      $interval(function(){
        //if match and no player guess input then increment missedGuesses count
        if(self.seq.match(self.n) && self.playerGuessed === false){
          self.missedGuesses++;
        }
        nextRound();       
      }, 2000, this.n+gameLength);
    };

    game.Game.prototype.guess = function(){
      if(this.seq.match(this.n)){
        this.correctGuesses++;
      } else {
        this.incorrectGuesses++;
      }
      this.playerGuessed = true;
    };

    //create board
    game.board = new game.Board(3, 3);
    $scope.nBack = new game.Game(game.board, 2);
    // g.play(2, 20);
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

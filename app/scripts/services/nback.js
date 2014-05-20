'use strict';

angular.module('nbackApp')
  .factory('nBack', function($interval){

    //Tile class
    var Tile = function(){
      this.active = false;
    };

    //Board class
    var Board = function(x, y){
      this.x = x;
      this.y = y;
      this.board = [];
      for (var i = 0; i < this.y; i ++){
        this.board.push([]);
        for (var j = 0; j < this.x; j++){
          this.board[i].push(new Tile());
        }
      }
    };

    //reset all tiles to off
    Board.prototype.reset = function(){
      _.each(this.board, function(row){
        _.each(row, function(tile){
          tile.active = false;
        });
      });
    };

    //select a random tile
    Board.prototype.getRandomTile = function(){
      var i = Math.floor(Math.random()*this.board.length);
      var j = Math.floor(Math.random()*this.board[0].length);
      return this.board[i][j];
    };

    //turn a random tile on
    Board.prototype.activateRandomTile = function(){
      var tile = this.getRandomTile();
      tile.active = true;
      return tile;
    };

    //Sequence class
    var Sequence = function(){
      this.seq = [];
    };

    //add next value
    Sequence.prototype.add = function(val){
      this.seq.push(val);
    };

    //check for n back match
    Sequence.prototype.match = function(n){
      if (this.seq.length < n+1){
        return false;
      }
      if(this.seq[this.seq.length-1] === this.seq[this.seq.length-(1+n)]){
        return true;
      }
      return false;
    };

    //Game class
    var Game = function(board, n){
      this.board = board;
      this.seq = new Sequence();
      this.scores = {
        correctGuesses   : 0,
        incorrectGuesses : 0,
        missedGuesses    : 0
      };
      this.n = n;
      this.playerGuessed = false;
      this.finishedGame = false;
    };

    //play a full game
    Game.prototype.play = function(gameLength){
      var self = this;
      console.log('gameLength is: ', gameLength);

      //play one seq item
      var nextRound = function(){
        self.board.reset();
        self.seq.add(self.board.activateRandomTile());
      };

      //play game for n+gameLength rounds
      $interval(function(){
        //if match and no player guess input then increment missedGuesses count
        if(self.seq.match(self.n) && self.playerGuessed === false){
          self.scores.missedGuesses++;
        }
        nextRound();
        //hack to update finished gameState
        if(self.seq.seq.length === self.n+gameLength-1){
          self.finishedGame = true;
          console.log("Finished Game");
        }
        console.log(self.finishedGame);
      }, 2000, this.n+gameLength);

    };

    //handle user guess
    Game.prototype.guess = function(){
      if(this.seq.match(this.n)){
        this.scores.correctGuesses++;
      } else {
        this.scores.incorrectGuesses++;
      }
      this.playerGuessed = true;
    };

    Game.prototype.getScores = function(){
      return this.scores;
    };

    //return gamestate so that it can be shared
    //across multiple controllers
    var board = new Board(3, 3);
    var game = new Game(board, 3);

    var gameState = {
      game: game,
    };

    return gameState;
});
















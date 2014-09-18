'use strict'
angular.module('grid', [])
  .factory('GridService', function(){
    var grid = {};
    var dim = 3; //default, matrix size
    var m = 2; //number of problem dimensions ( color, sound shape etc)
    var squares = Array.apply(null, (dim*dim)).map(Number.prototype.valueOf, 0);

    grid.dimensions = function(d){
      if(d === undefined) return dim;
      dim = d;
    };

    grid.reset = function(){
      squares.forEach(function(square, i){
        square.reset();
      });
    };

    grid.init = function(){
      squares = Array.apply(null, (dim*dim)).map(function(){
        return new Tile(m);
      });
    };

    grid.activate = function(m, val, x, y){
      this.getTile(x, y).activate(m, val);
    };

    grid.getTile = function(x, y){
      return squares[dim*y+x];
    };

    var Tile = function(m){
      this.m = m;
      for (var i = 0; i < this.m; i++ ){
        this.i = null;
      }
    };

    Tile.prototype.reset = function(){
      for (var i = 0; i < this.m; i++){
        this.i = null;
      }
    };

    Tile.prototype.activate = function(m, val){
      this.m = val;
    };
  });
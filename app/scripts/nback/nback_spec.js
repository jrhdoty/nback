'use strict';

describe('nback service', function(){

  beforeEach(module('nback'));

  var GameService, 
      _gridService, 
      $timeout,
      $rootScope,
      $httpBackend;

  beforeEach(function(){
    module(function($provide){
      _gridService = {
        size: {
          x: 3,
          y: 3
        }, 
        reset: angular.noop,
        activate: angular.noop
    };

    $provide.value('GridService', _gridService);
  })});

beforeEach(inject( function( _$httpBackend_, _$rootScope_, _$timeout_, _GameService_ ) {
  $httpBackend = _$httpBackend_;
  $rootScope = _$rootScope_;
  $timeout = _$timeout_;
  GameService = _GameService_;

 }));

  it('should have a startGame function', function(){
    expect(typeof GameService.startGame).to.equal('function');
  });

  it('should make n calls to $timeout', function(){
    var ticks = 10;
    GameService.startGame(ticks, 2, 3, 0);
    for ( var i = 0; i < ticks; i++ ){
      $timeout.flush();
    }
  });
});










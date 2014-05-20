'use strict';

angular.module('nbackApp')
  .controller('nBackCtrl', function($scope, $interval, nBack){
    console.log('INSIDE NBACK CONTROLLER');
    $scope.game = nBack.game;
    $scope.board = nBack.game.board;

    $scope.$watch('nBack.board', function(newVal, oldVal, scope){
      if(newVal){
        scope.game = nBack.game;
      }
    });

    $scope.$watch('game.finishedGame', function(newVal, oldVal){
      console.log('inside nBack game watcher');
      if(newVal === true && oldVal === false){

      }
    });
  });
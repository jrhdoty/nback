'use strict';

angular.module('nbackApp')
  .controller('nBackCtrl', function($scope, $interval, Auth, nBack){
    console.log('INSIDE NBACK CONTROLLER');
    console.log(Auth.currentUser());

    $scope.game = nBack.game;
    $scope.board = nBack.game.board;

    $scope.$watch('nBack.board', function(newVal, oldVal, scope){
      if(newVal){
        scope.game = nBack.game;
      }
    });
  });
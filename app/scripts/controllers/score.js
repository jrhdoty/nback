'use strict';

angular.module('nbackApp')
  .controller('ScoreCtrl', function($scope, nBack){
    console.log('inside ScoreCtrl');
    $scope.game = nBack.game;
    console.log($scope.game.scores);
  });

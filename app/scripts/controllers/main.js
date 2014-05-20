'use strict';

angular.module('nbackApp')
  .controller('MainCtrl', function ($scope, $http, nBack) {
    console.log('loaded main control');

    $scope.game = nBack.game;
    $scope.showScore = false;
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.$watch('game.finishedGame', function(newVal, oldVal){
      console.log('inside nBack game watcher');
      if(newVal === true && oldVal === false){
        $scope.showScore = true;
      } else if (newVal === false && oldVal === true){
        $scope.showScore = false;
      }
    });
  });

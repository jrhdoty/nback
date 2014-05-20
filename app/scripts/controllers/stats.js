'use strict';

angular.module('nbackApp')
  .controller('StatsCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
  });


'use strict';

angular.module('nbackApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });

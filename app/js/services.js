'use strict';

/* Services */

angular.module('app.services.lyrics-service', [])
  .factory('lyricsService', ['$http', '$q', function($http, $q) {

    function getLyrics(query) {
      return $http({
        method: 'GET',
        url: 'http://localhost:4730?query='+query
      });
    }

    return {
      getLyrics: getLyrics
    };
  }]);
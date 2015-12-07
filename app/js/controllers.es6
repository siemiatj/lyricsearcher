'use strict';

/* Controllers */

import { object } from 'underscore';

class SearchController {
  constructor(...services) {
    Object.assign(this, object(this.constructor.$inject, services));

    const { $scope, lyricsService} = this;

    $scope.items = [];
    this.items = [];
  }

  _parseData(data) {
    var ret = [];

    data.forEach((el) => {
      ret.push(el.title + ' - ' + el.artist.name);
    });

    return ret;
  }

  onItemSelect(item, idx) {
    this.lyrics = this.items[idx].snippet;
  }

  onQueryChange(text) {
    if (text) {
      const { $scope, lyricsService, _parseData } = this;

      lyricsService.getLyrics(text)
        .then((resp) => {
          this.items = resp.data;
          $scope.items = _parseData(resp.data);
        }, () => {
          $scope.items = [];
        });   
    }
  }
};

SearchController.$inject = [
  '$scope',
  'lyricsService'
];

angular.module('app.controllers.search-controller', [])
  .controller('searchController', SearchController);

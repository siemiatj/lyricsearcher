'use strict';

/* Directives */

import { debounce } from 'underscore';

const tpl = `
<div class="form-dropdown" dropdown>
  <div class="form-group">
    <input type="text"
    class="form-control query-input"
    dropdown-toggle
    ng-model="model.val"
    placeholder="{{ ::placeholder }}">
    <ng-transclude></ng-transclude>
  </div>

  <ul class="dropdown-menu dropdown-menu-left" role="menu" ng-show="model.val">
    <li ng-repeat="item in getFiltered(items, model.val) track by $index">
      <a href="" 
      ng-click="select(item, $index)" 
      ng-class="{ selected: selectedValue == item }" 
      ng-bind-html="formatItem(item)">
      </a>
    </li>
    <li class="text-center empty-item" ng-show="items.length == 0">
      No search results
    </li>
  </ul>
</div>`;

angular.module('app.directives.input-search', [])
  .directive('inputSearch', [
    '$timeout',
    '$sce',
    function ($timeout, $sce) {
      return {
        restrict: 'E',
        template: tpl,
        transclude: true,
        scope: {
          items        : '=',
          model        : '=?',
          placeholder  : '@',
          onSelect     : '&',
          onQueryChange: '&',
          getFiltered  : '=?'
        },
        link: function (scope, element) {
          scope.placeholder = scope.placeholder || 'Select...';
          scope.onSelect    = scope.onSelect || angular.noop;
          scope.onQueryChange = scope.onQueryChange || angular.noop;

          scope.getFiltered       || (scope.getFiltered = (items, query) => {
            query = query.toLowerCase();
            if (query) {
              return items.filter(item => item.toLowerCase().indexOf(query) !== -1);
            }
            return items;
          });

          scope.formatItem = function (item) {
            const queryLen = scope.model.val.length;
            const startIndex = item.indexOf(scope.model.val);

            if (queryLen === 0 || startIndex === -1) {
              return $sce.trustAsHtml(item);
            } else {
              return $sce.trustAsHtml(
                item.slice(0, startIndex) +
                '<strong>' + item.substr(startIndex, queryLen) + '</strong>' +
                item.slice(startIndex + queryLen)
              );
            }
          };

          scope.select = function (val, idx) {
            if (scope.model) {
              scope.model.val = val;
            }
            scope.onSelect({ item: val, idx: idx });
          };

          scope.$watch('model.val', debounce(function (query, queryOld) {

            if (query === queryOld) return;
            scope.onQueryChange({ query: query });
          }, 400));
        }
      };
    }
  ]);

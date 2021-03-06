'use strict';

/* App Bundle */

require('../../node_modules/angular-bootstrap/ui-bootstrap-tpls');
require('./services');
require('./controllers.es6');
require('./directives.es6');

angular.module('app', [
    'ui.bootstrap',
    'app.services',
    'app.controllers',
    'app.directives'
  ]);

angular.module('app.controllers', [
  'app.controllers.search-controller'
]);

angular.module('app.directives', [
  'app.directives.input-search'
]);

angular.module('app.services', [
  'app.services.lyrics-service'
]);

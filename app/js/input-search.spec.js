'use strict';

describe('Input search directive', function () {

  var $compile, $rootScope, $timeout;

  function createAndCompileEl(scope) {
    var el = angular.element('<input-search \
      items="items" \
      model="query" \
      placeholder="{{ placeholder }}" \
      on-query-change="queryChangeHandler(query)"> \
    </input-search>');
    $compile(el)(scope);
    scope.$digest();
    return el;
  }

  beforeEach(module('app'));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  it('should render correctly', function () {
    $rootScope.items = [];
    $rootScope.query = {val: ''};
    $rootScope.placeholder = 'Some placeholder';

    var el = createAndCompileEl($rootScope)[0];

    expect(el.querySelector('input.query-input')).to.be.ok;
    expect(el.querySelector('ul.dropdown-menu')).to.be.ok;
    expect(el.innerHTML).to.contain('dropdown-toggle');
    expect(el.innerHTML).to.contain('Some placeholder');
  });

  it('should show a list of available items', function () {
    $rootScope.items = ['One', 'Two', 'Three'];
    $rootScope.query = {val: ''};
    var el = createAndCompileEl($rootScope);

    var input = angular.element(el[0].querySelector('input'));
    input.triggerHandler('click');

    expect(el[0].innerHTML).to.contain('open');
  });

  it('should display nur visible items', function () {
    $rootScope.items = [];
    $rootScope.query = {val: ''};
    var el = createAndCompileEl($rootScope);
    var scope = el.isolateScope();

    scope.items = ['One', 'Two', 'Three'];
    scope.model.val = 'one';
    scope.$digest();
    expect(el[0].querySelectorAll('.dropdown-menu li:not(.empty-item)').length).to.equal(1);
  });

  it('should format tags accordingly with a query', function () {
    $rootScope.items = [];
    $rootScope.query = {val: ''};
    var el = createAndCompileEl($rootScope);
    var scope = el.isolateScope();

    scope.items = ['One', 'Onero', 'Two'];
    scope.model.val = 'One';
    scope.$digest();

    var itemsListEl = el[0].querySelector('.dropdown-menu');
    var html = itemsListEl.innerHTML;

    expect(html).to.contain('<strong>One</strong>');
    expect(html).to.contain('<strong>One</strong>ro');
    expect(html).to.not.contain('Two');
  });
});

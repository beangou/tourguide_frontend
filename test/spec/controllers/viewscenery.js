'use strict';

describe('Controller: ViewsceneryCtrl', function () {

  // load the controller's module
  beforeEach(module('tourguideFrontendApp'));

  var ViewsceneryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewsceneryCtrl = $controller('ViewsceneryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewsceneryCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: EditsceneryCtrl', function () {

  // load the controller's module
  beforeEach(module('tourguideFrontendApp'));

  var EditsceneryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditsceneryCtrl = $controller('EditsceneryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditsceneryCtrl.awesomeThings.length).toBe(3);
  });
});

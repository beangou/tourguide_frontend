'use strict';

describe('Controller: AddsceneryCtrl', function () {

  // load the controller's module
  beforeEach(module('tourguideFrontendApp'));

  var AddsceneryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddsceneryCtrl = $controller('AddsceneryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddsceneryCtrl.awesomeThings.length).toBe(3);
  });
});

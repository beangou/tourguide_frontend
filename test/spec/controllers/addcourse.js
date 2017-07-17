'use strict';

describe('Controller: AddcourseCtrl', function () {

  // load the controller's module
  beforeEach(module('tourguideFrontendApp'));

  var AddcourseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddcourseCtrl = $controller('AddcourseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddcourseCtrl.awesomeThings.length).toBe(3);
  });
});

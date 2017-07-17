'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the clientApp
 */

angular.module('tourguideFrontendApp')
  .controller('AlertsCtrl', function ($scope, alertService) {
    $scope.alerts = alertService.get();
  });

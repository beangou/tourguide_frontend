'use strict';

/**
 * @ngdoc function
 * @name tourguideFrontendApp.controller:ViewsceneryCtrl
 * @description
 * # ViewsceneryCtrl
 * Controller of the tourguideFrontendApp
 */
angular.module('tourguideFrontendApp')
  .controller('ViewsceneryCtrl', function ($scope, $http, $routeParams, alertService, userService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      $scope.params = $routeParams;
      console.log("params=" + $scope.params);
      $scope.sceneryId = $scope.params.sceneryId;

      $scope.viewContent = function() {
        var postObject = new Object();
        postObject.id = $scope.sceneryId;
        $http.post('/backend/scenery/detail', postObject)
          .catch(function onError(response) {
            var data = response.data;
            var status = response.status;
            alertService.add('danger', data.error.message);
          })
          .then(function onSuccess(response) {
            var data = response.data;
            var status = response.status;
            $scope.scenery = data.data;
            $('#content').html(data.data.description);
          });
      };

      $scope.viewContent();
  });

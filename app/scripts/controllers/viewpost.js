'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewpostCtrl
 * @description
 * # ViewpostCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('ViewpostCtrl', function ($scope, $http, $routeParams, alertService, userService, $location) {

    $scope.user = userService;
    $scope.params = $routeParams;
    $scope.postId = $scope.params.postId;

    $scope.viewPost = function() {
      $http.get('/app/post/' + $scope.postId)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.post = data;
        });
    };

    $scope.viewPost();
  });

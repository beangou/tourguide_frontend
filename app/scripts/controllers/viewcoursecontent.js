'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewcontentCtrl
 * @description
 * # ViewcontentCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('ViewcoursecontentCtrl', function ($scope, $http, $routeParams, alertService, userService, $location) {

    $scope.params = $routeParams;
    $scope.courseId = $scope.params.courseId;

    $scope.viewContent = function() {
      var postObject = new Object();
      postObject.id = $scope.courseId;
      $http.post('/app/v1/course', postObject)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.course = data.data;
          $('#content').html(data.data.content);
        });
    };

    $scope.viewContent();
  });

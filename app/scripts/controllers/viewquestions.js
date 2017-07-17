'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewquestionsCtrl
 * @description
 * # ViewquestionsCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('ViewquestionsCtrl', function ($scope, $http, $routeParams, alertService) {

    $scope.viewQuestions = function() {
      var postObject = new Object();

      if($routeParams.currentPage) {
        postObject.pageIndex = $routeParams.currentPage-1;
      }else {
        postObject.pageIndex = 0;
      }
      // $scope.currentPage = 2;

      // alert($scope.currentPage);

      postObject.pageSize  = 5;

      $http.post('/app/v1/questions', postObject)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.questions = data.data;
          $scope.totalItems = data.totalItems;
          $scope.currentPage = postObject.pageIndex+1;
        });
    };

    $scope.viewQuestions();

    $scope.pageChanged = function() {
      // $scope.viewQuestions();
      window.location.href="/#/questions?currentPage="+$scope.currentPage;
    }
  });

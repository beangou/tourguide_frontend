'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('DashboardCtrl', function ($scope, $log, $http, alertService, $location) {

    $scope.loadSceneries = function() {
      var getObject = {
        page : 0,
        size : 10
      };
      $http.post('/backend/scenery/list', getObject)
        .catch(function onError(response) {
          var data = response.data;
          var status = response.status;
          console.log("data=" + data);
          console.log("status=" + status);

          if(status === 401) {
            $location.path('/login');
          } else {
            alertService.add('danger', data.error.message);
          }
          $location.path('/login');
        })
        .then(function onSuccess(response) {
          var data = response.data;
          var status = response.status;
          console.log("data.code=" + data.code);
          console.log("status=" + status);
          if (status == 200 && data.code ==  0) {
            $scope.sceneries = data.data;
            $scope.totalItems = 100;
            $scope.currentPage = 2;
          } else {
            alertService.add('danger', data.message);
          }
        });
    };

    $scope.pageChanged = function() {
      window.location.href="/#/dashboard?currentPage="+$scope.currentPage;
    }

    $scope.loadSceneries();
  });

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
          // var statusText = response.statusText;
          // var headers = response.headers;
          // var config = response.config;

          // $scope.user = data;
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
          console.log("data.data.user=" + data.data);
          console.log("data.code=" + data.code);
          console.log("status=" + status);
          if (status == 200 && data.code ==  0) {
            $scope.sceneries = data.data;
          } else {
            alertService.add('danger', data.message);
          }
        });
    };

    $scope.loadSceneries();
  });

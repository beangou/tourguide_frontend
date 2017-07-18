'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('DashboardCtrl', function ($scope, $log, $http, $routeParams, alertService, $location) {

    var pageIndex = 1;

    if($routeParams.currentPage) {
      pageIndex = $routeParams.currentPage;
    }

    $scope.loadSceneries = function() {
      var getObject = {
        page : pageIndex,
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
            $scope.sceneries = data.data.records;
            $scope.totalItems = data.data.totalCount;
            $scope.currentPage = data.data.page;
          } else {
            alertService.add('danger', data.message);
          }
        });
    };

    $scope.editScenery = function (event, ele) {
      window.location.href="/#!/editscenery/" + ele.scenery.id;
    }

    $scope.deleteScenery = function (ele) {
      if(confirm("确定要删除'"+ele.scenery.name+"'景点吗？")) {
        $http.post('/backend/scenery/delete', {id: ele.scenery.id})
          .catch(function onError(response) {
            var data = response.data;
            var status = response.status;
            alertService.add('danger', data.message);
          })
          .then(function onSuccess(response) {
            var data = response.data;
            var status = response.status;
            console.log("data.code=" + data.code);
            console.log("status=" + status);
            if (status == 200 && data.code ==  0) {
              alertService.add('danger', data.message);
              location.reload();
              // window.location.href="/#!/dashboard?currentPage="+$scope.currentPage;
            } else {
              alertService.add('danger', data.message);
            }
          });
      }
    }

    $scope.pageChanged = function() {
      window.location.href="/#!/dashboard?currentPage="+$scope.currentPage;
    }

    $scope.loadSceneries();
  });

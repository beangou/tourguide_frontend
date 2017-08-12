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

    $scope.editScenery = function (id) {
      window.location.href="/#!/editscenery/" + id;
    }

    $scope.deleteScenery = function (scenery) {
      if(confirm("确定要删除'"+scenery.name+"'景点吗？")) {
        $http.post('/backend/scenery/delete', {id: scenery.id})
          .catch(function onError(response) {
            var data = response.data;
            alertService.add('danger', data.message);
          })
          .then(function onSuccess(response) {
            var data = response.data;
            var status = response.status;
            console.log("data.code=" + data.code);
            console.log("status=" + status);
            if (status == 200 && data.code ==  0) {
              alertService.add('danger', data.message);
              window.location.href="/#/dashboard";
            } else {
              alertService.add('danger', data.message);
            }
          });
      }
    }

  });

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('LoginCtrl', function ($scope, userService, $location, $log, $http, alertService) {

    $scope.isAuthenticated = function() {
      if(userService.username) {
        $log.debug(userService.username);
        $location.path('/dashboard');
      } else {
        // $http.get('backend/login')
        $http.get('/backend/isAuthenticated')
          .catch(function onError(response) {
            var data = response.data;
            var status = response.status;
            // var statusText = response.statusText;
            // var headers = response.headers;
            // var config = response.config;

            // $scope.user = data;
            console.log("data=" + data);
            console.log("status=" + status);
            $location.path('/login');
          })
          .then(function onSuccess(response) {
            var data = response.data;
            var status = response.status;
            console.log("data.data.user=" + data.data.user);
            console.log("data.code=" + data.code);
            console.log("status=" + status);
            if(data.code == 0) {
              userService.username = data.data.user;
              $location.path('/dashboard');
            }
          });
      }
    };

    $scope.isAuthenticated();

    $scope.login = function() {
      var payload = {
        email : $('#email').val(),
        password : $('#password').val()
      };

      $http.post('/backend/login', payload)
        .catch(function onError(response) {
          var data = response.data;
          var status = response.status;
          if(status === 400) {
            angular.forEach(data, function(value, key) {
              if(key === 'email' || key === 'password') {
                alertService.add('danger', key + ' : ' + value);
              } else {
                alertService.add('danger', value.message);
              }
            });
          } else if(status === 401) {
            alertService.add('danger', 'Invalid login or password!');
          } else if(status === 500) {
            alertService.add('danger', 'Internal server error!');
          } else {
            alertService.add('danger', data);
          }
        })
        .then(function onSuccess(response) {
          var data = response.data;
          console.log("data="+data);
          if(data.code == 0) {
            userService.username = data.data;
            $location.path('/dashboard');
          } else {
            alertService.add('danger', data.data);
          }
        });
    };
  });

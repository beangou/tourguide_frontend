'use strict';

/**
 * @ngdoc function
 * @name tourguideFrontendApp.controller:AddsceneryCtrl
 * @description
 * # AddsceneryCtrl
 * Controller of the tourguideFrontendApp
 */
angular.module('tourguideFrontendApp')
  .controller('AddsceneryCtrl', function ($scope, userService, $location, $log, $http, alertService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $('#content').html("");
    $('#content').val("");
    $('#content').froalaEditor({
      heightMin: 300,
      heightMax: 200
    });

    $scope.loadAddress = function () {
      var params = {type: 0, page: 0, size: 20};
      $http.post('/backend/dictionary/list', params)
        .catch(function onError(response) {
          var data = response.data;
          var status = response.status;
          alertService.add('danger', data.message);
        })
        .then(function onSuccess(response) {
          var data = response.data;
          console.log("data="+data);
          if(data.code == 0) {
            $.each(data.data, function (i, item) {
              $('#select_address').append($('<option>', {
                value: item.code,
                text : item.value
              }));
            });
          }
        });
    };


    $scope.addScenery = function() {
      // 调用保存方法, 找出参数
      var addParams = {
        name : $('#name').val(),
        type : $('#type').val(),
        link : $('#link').val(),
        icon : $('#icon').val(),
        isInternal : $("input[name='isInternal'][checked]").val(),

        addressCode : $('#select_address').val(),
        addressValue : $('#select_address').find("option:selected").text(),
        description : $('#content').froalaEditor('html.get')
      };

      $http.post('/backend/scenery/add', addParams)
        .catch(function onError(response) {
          var data = response.data;
          var status = response.status;
          alertService.add('danger', data.message);
        })
        .then(function onSuccess(response) {
          var data = response.data;
          console.log("data="+data);
          if(data.code == 0) {
            userService.username = data.data;
            $location.path('/dashboard');
          }
        });
    }

    $scope.loadAddress();
  });

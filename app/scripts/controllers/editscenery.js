'use strict';

/**
 * @ngdoc function
 * @name tourguideFrontendApp.controller:EditsceneryCtrl
 * @description
 * # EditsceneryCtrl
 * Controller of the tourguideFrontendApp
 */
angular.module('tourguideFrontendApp')
  .controller('EditsceneryCtrl', function ($scope, $http, $routeParams, alertService, userService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.params = $routeParams;
    console.log("params=" + $scope.params);
    $scope.sceneryId = $scope.params.sceneryId;


    $scope.loadAddress = function (selectedValue) {
      var params = {type: 0, page: 0, size: 100};
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
                text : item.value,
                selected: item.code == selectedValue
              }));
            });
          }
        });
    };


    $scope.fillInContent = function() {
      var postObject = new Object();
      postObject.id = $scope.sceneryId;
      $http.post('/backend/scenery/detail', postObject)
        .catch(function onError(response) {
          var data = response.data;
          alertService.add('danger', data.error.message);
        })
        .then(function onSuccess(response) {
          var data = response.data;
          $scope.loadAddress(data.data.addressCode);
          if (data.data.internal) {
            $('#isInternal_inner').attr("checked", 'checked');
          } else {
            $('#isInternal_outer').attr("checked", 'checked');
          }
          $scope.scenery = data.data;
          $('#content').html(data.data.description);
          $('#content').froalaEditor({
            heightMin: 300,
            heightMax: 200
          });
        });
    };


    $scope.updateScenery = function() {
      // 调用保存方法, 找出参数
      var updateParams = {
        id: $scope.sceneryId,
        name : $('#name').val(),
        type : $('#type').val(),
        link : $('#link').val(),
        icon : $('#icon').val(),
        internal : $("input[name='isInternal']:checked").val() == 'true',

        addressCode : $('#select_address').val(),
        addressValue : $('#select_address').find("option:selected").text(),
        description : $('#content').froalaEditor('html.get')
      };

      $http.post('/backend/scenery/update', updateParams)
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

    $scope.fillInContent();
  });

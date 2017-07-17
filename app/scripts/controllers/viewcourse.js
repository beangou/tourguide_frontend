'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewcourseCtrl
 * @description
 * # ViewcourseCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('ViewcourseCtrl', function ($scope, $http, $routeParams, alertService, userService, $location, $mdDialog) {

    $scope.params = $routeParams;
    $scope.courseId = $scope.params.courseId;

    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.showPrompt = function(ev, ele) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('编辑标题')
        .initialValue(ele.course.title)
        .targetEvent(ev)
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function(result) {
        // $scope.status = 'You decided to name your dog ' + result + '.';
        // 修改标题
        $scope.updateTitle(ele.course.id, result, ele);

      }, function() {
        //$scope.status = 'You didn\'t name your dog.';
      });
    };


    // 更新
    $scope.updateTitle =  function(id, title, ele) {
      var payload = {
        id : id,
        title: title
      };
      $http.patch('app/v1/course', payload)
        .error(function(data, status) {
          if(status === 400) {
            angular.forEach(data, function(value, key) {
              if(key === 'id' || key === 'content') {
                alertService.add('danger', key + ' : ' + value);
              } else {
                alertService.add('danger', value.message);
              }
            });
          } else if(status === 401) {
            $location.path('/login');
          } else if(status === 500) {
            alertService.add('danger', 'Internal server error!');
          } else {
            alertService.add('danger', data);
          }
        })
        .success(function(data) {
          ele.course.title = title;
          alertService.add('success', data.success.message);
        });
    }

    $scope.delete = function (ele) {
      if(confirm("确定要删除该章节吗？")) {
        var postObject = new Object();
        postObject.id = ele.course.id;
        $http.post('/app/v1/deletecourse', postObject)
          .error(function(data, status) {
            if(status === 401) {
              $location.path('/login');
            } else {
              alertService.add('danger', data.error.message);
            }
          })
          .success(function(data) {
            alertService.add('danger', data.responseMsg);
            $scope.viewCourses();
          });
      }
    }

    $scope.viewCourses = function() {
    var postObject = new Object();
    postObject.parentId = $scope.courseId;
    $http.post('/app/v1/courses', postObject)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.courses = data.data;
        });
    };

    $scope.viewCourses();
  });

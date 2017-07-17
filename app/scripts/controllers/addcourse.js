'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddcourseCtrl
 * @description
 * # AddcourseCtrl
 * Controller of the clientApp
 */
angular.module('tourguideFrontendApp')
  .controller('AddcourseCtrl', function ($scope, $http, alertService, $location) {

    $('#content').html("");
    $('#content').val("");
    $('#content').froalaEditor({
      heightMin: 300,
      heightMax: 200
    });

  });

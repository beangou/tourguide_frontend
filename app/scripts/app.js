'use strict';

/**
 * @ngdoc overview
 * @name tourguideFrontendApp
 * @description
 * # tourguideFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('tourguideFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'froala',
    'ui.bootstrap'
  ])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl',
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/questions', {
      templateUrl: 'views/viewquestions.html',
      controller: 'ViewquestionsCtrl'
    })
    .when('/addscenery', {
      templateUrl: 'views/addscenery.html',
      controller: 'AddsceneryCtrl'
    })
    .when('/viewpost/:postId', {
      templateUrl: 'views/viewpost.html',
      controller: 'ViewpostCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/addcourse', {
      templateUrl: 'views/addcourse.html',
      controller: 'AddcourseCtrl'
    })
    .when('/viewcourse/:courseId', {
      templateUrl: 'views/viewcourse.html',
      controller: 'ViewcourseCtrl'
    })
    .when('/viewcoursecontent/:courseId', {
      templateUrl: 'views/viewcoursecontent.html',
      controller: 'ViewcoursecontentCtrl'
    }).when('/addquestion', {
    templateUrl: 'views/addquestion.html',
    controller: 'AddquestionCtrl'
  })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .when('/viewscenery/:sceneryId', {
      templateUrl: 'views/viewscenery.html',
      controller: 'ViewsceneryCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}).value('froalaConfig', {
  toolbarInline: false,
  placeholderText: 'Enter Text Here'
});

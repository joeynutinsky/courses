var courseApp = angular.module('courseApp', ['ngRoute', 'ui.bootstrap'])
courseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/courses/:courseId?', {
        templateUrl: '/templates/course.html',
        controller: 'CourseCtrl'
      })
      .when('/students/:studentId?/:courseId?', {
        templateUrl: '/templates/student.html',
        controller: 'StudentCtrl'
      })
      .when('/major/:majorId?', {
        templateUrl: '/templates/major.html',
        controller: 'MajorCtrl'
      })
      .when('/new', {
        templateUrl: '/templates/newStudent.html',
        controller: 'NewStudentCtrl'
      })
      .otherwise({
        templateUrl: '/templates/welcome.html',
        controller: 'DefaultCtrl'
      })
  }])
'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap'])
todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/courses/:courseId?', {
        templateUrl: '/templates/course.html',
        controller: 'CourseCtrl'
      })
      .when('/students/:studentId?', {
        templateUrl: '/templates/todo.html',
        controller: 'TodoCtrl'
      })
      .otherwise({
        redirectTo: '/',
        caseInsensitiveMatch: true
      })
  }])

todoApp.controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService', 'StudentService', function($scope, $rootScope, TodoService, StudentService) {
  $scope.formData = {};
  $scope.activeStudent;
  
  $scope.getStudent = function() {
    console.log($scope.formData);
    StudentService.getStudent($scope.formData).then(function(response) {
      console.log(response.name);
      $scope.activeStudent = response;
      $scope.formData = {};
    })
  }
  
  $scope.addCourse = function() {
    console.log("Text Entered: "+$scope.formData.newCourse);
    var toPost = {};
    toPost.studentId = $scope.activeStudent.studentId;
    toPost.courseId = $scope.formData.newCourse;
    StudentService.addCourse(toPost).then(function(response) {
      console.log(response.name);
      StudentService.findCourse(toPost.courseId).then(function(respC) {
        $scope.activeStudent.courses.push(respC);
      });
    })
  }
  
  
  $scope.checkCourse = function() {
    StudentService.findCourse($scope.formData.prereq).then(function(theCourse) {
      var isQualified = false;
      var coursesNeeded = [];
      for(var i=0; i<theCourse.prerequisites.length;i++)
      {
        isQualified=false;
        var preReq=theCourse.prerequisites[i];
        for(var m=0;m<$scope.activeStudent.courses.length;m++)
        {
          if(preReq.courseId==$scope.activeStudent.courses[m].courseId)
          {
            isQualified=true;
          }
        }
        if(!isQualified)
        {
          coursesNeeded.push(preReq)
        } 
      }
      $scope.missingCourses = coursesNeeded;
    });
  }
}])

todoApp.controller('CourseCtrl', ['$scope', '$rootScope', 'CourseService', function($scope, $rootScope, CourseService) {
  $scope.formData = {};
  $scope.course;
  
  CourseService.getCourse().then(function(response){
    $scope.course = response;
    console.log($scope.course);
  });
  
  $scope.createCourse = function() {
    console.log($scope.formData);
    CourseService.addCourse($scope.formData).then(function(response) {
       $scope.course.push($scope.formData);
    })
  }
}])

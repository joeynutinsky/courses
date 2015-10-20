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
    checkCoursePrereq($scope.formData.newCourse, function(missingCourses){
      if(missingCourses.length==0)
      {
        console.log("Text Entered: "+$scope.formData.newCourse);
        StudentService.addCourse($scope.activeStudent.studentId, $scope.formData.newCourse).then(function(response) {
         $scope.activeStudent=response;
        })
      }
      else{
         var toAlert="Student is missing: ";
         for(var a=0;a<missingCourses.length;a++)
         {
           toAlert+=missingCourses[a].courseId+" ";
         }
         alert(toAlert);
      }
    })
    
  }
  
  $scope.deleteCourse = function(toDelete){
    for(var l=0;l<$scope.activeStudent.courses.length;l++)
    {
      var curCourse = $scope.activeStudent.courses[l];
      console.log("checking "+curCourse.courseId);
      if(curCourse.courseId==toDelete)
      {
        console.log("Found!");
        $scope.activeStudent.courses.splice(l,1);
        StudentService.deleteCourse(curCourse.courseId, $scope.activeStudent.studentId);
        break;
      }
    }
  }
  $scope.checkCourse = function() {
    checkCoursePrereq($scope.formData.prereq, function(theCourses){
      console.log("HERE! "+theCourses[0].courseId);
      $scope.missingCourses=theCourses;
    });
  }
  
  var checkCoursePrereq = function(courseId, callback)
  {
     StudentService.findCourse(courseId).then(function(theCourse) {
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
      callback(coursesNeeded);
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

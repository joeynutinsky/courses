'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap'])
todoApp.config(['$routeProvider',
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
      .otherwise({
        templateUrl: '/templates/welcome.html',
        controller: 'DefaultCtrl',
        caseInsensitiveMatch: true
      })
  }])

todoApp.controller('DefaultCtrl', ['$scope', function($scope){
  
}])


todoApp.controller('StudentCtrl', ['$scope', '$routeParams', '$rootScope', '$http', 'StudentService', function($scope, $routeParams, $rootScope, $http, StudentService) {
  $scope.formData = {};
  $scope.activeStudent;
  $scope.activeCourse;
  
  if($routeParams.courseId != null)
  {
    $http.get('/course/'+$routeParams.courseId).success(function(resp) {
      $scope.activeCourse = resp;
    })
  }
  $http.get('/student/'+$routeParams.studentId).success(function(resp){
    $scope.activeStudent = resp;
  });
  
  $scope.highlightCourse = function(course)
  {
    $http.get('/course/'+course).success(function(resp) {
      $scope.activeCourse = resp;
    })
  }
  $scope.closeCourseView = function()
  {
    $scope.activeCourse = null;
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
  
  $scope.goBack = function (){
    window.history.back();
  }
  
  $scope.deleteCourse = function(toDelete){
    StudentService.deleteCourse(toDelete, $scope.activeStudent.studentId).then(function(response){
      $scope.activeStudent=response;
    })
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

todoApp.controller('MajorCtrl', ['$scope', '$rootScope', 'MajorService', function($scope, $rootScope, MajorService) {
  $scope.formData = {};
  $scope.data = {};
  
  MajorService.getMajor().then(function(response){
    $scope.data.major = response;
  });
  $scope.getCoursesForMajor = function() {
    var maj =$scope.data.majorSelect;
    $scope.data.courses = [];
    MajorService.getCoursesForMajor(maj).then(function (response){
      $scope.data.courses = response;
    });
  }
}])

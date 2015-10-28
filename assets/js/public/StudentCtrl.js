courseApp.controller('StudentCtrl2', ['$scope', '$routeParams', '$http', 'StudentService', function($scope, $routeParams, $http, StudentService) {
  $scope.formData = {};
  $scope.activeStudent;
  $scope.activeCourse;
  $scope.courseHistory = [];
  $scope.remainingClasses = [];

  if($routeParams.courseId != null)
  {
    $http.get('/course/'+$routeParams.courseId).success(function(resp) {
      $scope.activeCourse = resp;
    })
  }
  $http.get('/student/'+$routeParams.studentId).success(function(resp){
    $scope.activeStudent = resp;
    console.log($routeParams.studentId);
    $http.get('/major/'+resp.major.id+'/courses').success(function(resp2){
      for(var i=0;i<resp2.length;i++)
        $scope.remainingClasses.push(resp2[i]);
    });
  });

  $scope.highlightCourse = function(course, backCourse)
  {
    if($scope.activeCourse!=null && backCourse==null)
      {
        $scope.courseHistory.push($scope.activeCourse);
        console.log($scope.courseHistory.length);
      }
      
    $http.get('/course/'+course).success(function(resp) {
      $scope.activeCourse = resp;
    })
  }
  
  $scope.courseBack = function()
  {
    $scope.highlightCourse($scope.courseHistory.pop().courseId, 1);
  }
  
  $scope.closeCourseView = function()
  {
    $scope.activeCourse = null;
    $scope.courseHistory = [];
  }
  
  $scope.addCourse = function(newCourse) {
    if(newCourse==null)
    {
      newCourse = $scope.formData.newCourse;
    }
    checkCoursePrereq(newCourse, function(missingCourses){
      if(missingCourses.length==0)
      {
        console.log("Text Entered: "+newCourse);
        StudentService.addCourse($scope.activeStudent.studentId, newCourse).then(function(response) {
         StudentService.getStudent(response.studentId).then(function(student){
           $scope.activeStudent = student;
         })
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
  
  $scope.checkCourse = function(courseId)
  {
    var takenCourse = false;
    for(var i=0;i<$scope.activeStudent.courses.length; i++)
    {
      if(courseId==$scope.activeStudent.courses[i].courseId)
      {
        takenCourse = true;
      }
    }
    return takenCourse;
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
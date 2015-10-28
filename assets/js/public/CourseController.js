courseApp.controller('CourseCtrl', ['$scope', 'CourseService', function($scope, CourseService) {
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

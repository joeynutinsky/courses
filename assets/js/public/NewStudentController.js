courseApp.controller('NewStudentCtrl', ['$scope', '$rootScope', 'MajorService', 'StudentService', function($scope, $rootScope, MajorService, StudentService) {
  $scope.formData = {};
  $scope.data = {};
  $scope.student = {};
 

MajorService.getMajor().then(function(resp) {
  $scope.majors = resp;
})

$scope.createStudent = function() {
  StudentService.addStudent($scope.student).then(function(resp) {
    window.location.href = "#/students/"+resp.studentId;
  })
}
}])

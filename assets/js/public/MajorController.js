courseApp.controller('MajorCtrl', ['$scope', '$rootScope', 'MajorService', function($scope, $rootScope, MajorService) {
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

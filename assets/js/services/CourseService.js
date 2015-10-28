courseApp.service('CourseService', function($http, $q) {
  return {
    'getCourse': function() {
      var defer = $q.defer();
      $http.get('/course').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addCourse': function(newCourse) {
      var defer = $q.defer();
      $http.post('/course', newCourse).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }})
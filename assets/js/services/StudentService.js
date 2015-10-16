todoApp.service('StudentService', function($http, $q) {
  return {
    'getStudent': function(todo) {
      console.log(todo);
      var defer = $q.defer();
      $http.get('/student/'+todo.value).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addCourse': function(todo) {
      console.log(todo);
      var defer = $q.defer();
      $http.put('/student/addCourse',todo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
      'findCourse': function(findCourse){
      var defer = $q.defer();
      $http.get('/course/'+findCourse).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }})
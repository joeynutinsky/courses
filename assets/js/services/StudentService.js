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
    'addCourse': function(student, course) {
      var defer = $q.defer();
      $http.post('/student/'+student+'/courses/'+course).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'deleteCourse': function(course, student) {
      var defer = $q.defer();
      $http.delete('/student/'+student+'/courses/'+course).success(function(resp){
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
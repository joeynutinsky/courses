courseApp.service('StudentService', function($http, $q) {
  return {
    'getStudent': function(todo) {
      console.log(todo);
      var defer = $q.defer();
      $http.get('/student/'+todo).success(function(resp){
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
    },
    'addStudent': function(student){
      var defer = $q.defer();
      $http.post('/student', student).success(function(resp){
        defer.resolve(resp);
      }).error(function(err){
        defer.reject(err);
      });
      return defer.promise;
    },
    'findStudents': function(course){
      var defer = $q.defer();
      $http.get('/student/studentsWithClass?courseId='+course).success(function(resp){
        defer.resolve(resp);
      }).error(function(err){
        defer.reject(err);
      });
      return defer.promise;
    },
    'searchCourse': function(search){
      var defer = $q.defer();
      $http.get('/course/findCourse?query='+search).success(function(resp){
        defer.resolve(resp);
      }).error(function(err){
        defer.reject(err);
      });
      return defer.promise;
    }
  }})
todoApp.service('MajorService', function($http, $q) {
  return {
    'getMajor': function() {
      var defer = $q.defer();
      $http.get('/major').success(function(resp){
        console.log("MAJORS"+resp[0].name);
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getCoursesForMajor': function(maj) {
      var defer = $q.defer();
      $http.get('/major/'+maj+'/courses').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }})
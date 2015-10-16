module.exports = {
  addCourse: function(req, next) {
    Student.findOne(req.studentId).exec(function(err, student) {
      student.courses.add(req.courseId);
      console.log("Updated Courses: "+student.courses);
      student.save();
      if(err) throw err;
      next(student);
    })
  }
}
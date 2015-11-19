/**
 * StudentController
 *
 * @description :: Server-side logic for managing Students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	hasClass: function (req, res, next) {
    var student = req.param('studentId');
    var course = req.param('courseId');
    var hasClass = false;
    
    Student.findOne(student).populate('courses').exec(function(err, student){
      for(var i=0;i<student.courses.length;i++){
        if(student.courses[i].courseId==course)
        {
          hasClass=true;
        }
      }
      res.json(hasClass);
    });
  },
  
  studentsWithClass: function (req, res, next) {
    var course = req.param('courseId');
    var students = [];
    function sendBack() {
        res.json(students);
    }
    Student.find().populate('courses').exec(function(err, student, finish){
      for(var s = 0; s<student.length;s++)
      {
        for(var c = 0; c<student[s].courses.length;c++)
        {
          if(student[s].courses[c].courseId==course)
          {
            students.push(student[s]);
          }
        }
      }
       sendBack();
    });
}
  
};


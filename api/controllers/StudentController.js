/**
 * StudentController
 *
 * @description :: Server-side logic for managing Students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addCourse: function(req, res) {
        console.log(req.body);
        StudentService.addCourse(req.body, function(success) {
            res.json(success)
        })
    },
};


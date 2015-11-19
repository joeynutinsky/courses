/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	findCourse: function(req, res, next) {
		var query = req.param('query');
		
		Course.find({
            or : [
                {name: {'contains': query}},
                {courseId: {'contains': query}}
            ]
        }).exec(function(err, courses){
            res.json(courses);
        });
	}
};


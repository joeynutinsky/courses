/**
* Student.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name: 'text',
      studentId: {
        'type': 'integer',
        primaryKey: true
      },
      courses: {
        collection: 'Course'
      },
      major: {
        model: 'Major'
      },
      isMarried: function () {
      return this.major;
    },
    hasCourse: function (course){
      for(var i=0;i<this.courses.length;i++)
      {
        if(course==this.courses[i].courseId)
        {
          return true;
        }
      }
      return false;
    },
      
  }
};


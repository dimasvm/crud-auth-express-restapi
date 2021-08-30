module.exports = app => {
    const students = require('../controllers/student.controller')

    const apiPath = '/api/v1'

    // create new student
    app.post(apiPath + "/student", students.create)

    // Retrieve all Users
    app.get(apiPath + "/student", students.findAll);

    // Retrieve a single User with studentId
    app.get(apiPath + "/student/:studentId", students.findOne);

    // Update a User with studentId
    app.put(apiPath + "/student/:studentId", students.update);

    // Delete a User with studentId
    app.delete(apiPath + "/student/:studentId", students.delete);

    // Create a new User
    app.delete(apiPath + "/student", students.deleteAll);
}
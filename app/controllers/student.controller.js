const db = require('../models')
const Student = db.students
const Op = db.Sequelize.Op

// create and save a new student
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  // Create a Student
  const student = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    birth: req.body.birth,
    height: req.body.height,
    weight: req.body.weight,
    parent_income: req.body.parent_income
  }

  // Save Student in the database
  Student.create(student)
    .then(data => {
        res.send(data)
    }).catch(err => {
      console.log('error', err)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the student."
        })
    })
}

// Retrieve all students from the database.
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null

  Student.findAll({ where: condition })
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        })
    })
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
  const id = req.params.studentId

  Student.findByPk(id)
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: 'Error retrieving student with id=' + id
      })
    })
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
  const id = req.params.studentId

  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Student.update(req.body, {where: {id: id}})
    .then(num => {
      if (num == 1) {
        res.send({message: 'Student was updated successfully.'})
      } else {
        res.send({message: `Cannot update student with id=${id}`})
      }
    }).catch(err => {
      res.status(500).send({
        message: 'Error updating student with id=' + id
      })
    })
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
  const id = req.params.studentId

  Student.destroy({where: {id: id}})
    .then(num => {
      if (num == 1) {
        res.send({message: 'Student was deleted successfully.'})
      } else {
        res.send({message: `Cannot delete Student with id=${id}`})
      }
    }).catch(err => {
      res.status(500).send({message: `Cannot delete Student with id=${id}`})
    })
};

// Delete all students from the database.
exports.deleteAll = (req, res) => {
  Student.destroy({where: {}, truncate: false})
    .then(nums => {
      res.send({messsage: `${nums} students were deleted successfully.`})
    }).catch(err => {
      res.send({message: err.message || 'Some error occurred while removing all students.'})
    })
};
const db = require('../models')
const config = require('../config/auth.config')
const User = db.users
const Role = db.roles

const Op = db.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

exports.signup = (req, res) => {
  // save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user => {
    // chcek if roles existed.
    if (req.body.roles && req.body.roles.length != 0) {
      Role.findAll({where: {name: {[Op.or]: req.body.roles}}})
        .then(roles => {
          user.setRoles(roles).then(() => {
            res.send({message: 'User was registered successfully!'})
          })
        })
    }
    // if roles doesn't existed
    else {
      // user role = 1 { default }
      user.setRoles([1]).then(() => {
        res.send({message: 'User was registered successfully!'})
      })
    }
  }).catch(err => {
    res.status(500).send({message: err.message})
  })
}

exports.signin = (req, res) => {
  User.findOne({where: {username: req.body.username}})
    .then(user => {
      if (! user) {
        return res.status(404).send({message: 'User not found.'})
      }
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (! passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: 'Invalid password!'
        })
      }

      // if success, generate token jwt
      var token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      })
    }).catch(err => {
      res.status(500).send({message: err.message})
    })
}
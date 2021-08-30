const Sequelize = require('sequelize')
const config = require('../config/db.config')

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialeg,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.students = require('./student.model')(sequelize, Sequelize)
db.users = require('./user.model')(sequelize, Sequelize)
db.roles = require('./role.model')(sequelize, Sequelize)

db.roles.belongsToMany(db.users, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
})
db.users.belongsToMany(db.roles, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
})

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
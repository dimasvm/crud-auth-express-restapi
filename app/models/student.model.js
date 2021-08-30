module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('students', {
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        birth: {
            type: Sequelize.DATE,
        },
        height: {
            type: Sequelize.INTEGER,
        },
        weight: {
            type: Sequelize.FLOAT,
        },
        parent_income: {
            type: Sequelize.INTEGER,
        },
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Student;
}
const { DataTypes } = require('sequelize');

const createUserModel = (sequelize) => {
    const User = sequelize.define('User', {
        userName : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        role : {
            type : DataTypes.STRING,
            allowNull : false,
            defaultValue : 'user',
            validate : {
                isIn: [['user','admin']]
            }
        }
    })

    return User;
}

module.exports = createUserModel;
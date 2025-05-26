import { DataTypes } from "sequelize";

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
        }
        
    })

    return User;
}

module.exports = createUserModel;
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbFunctions");

const userSchema = sequelize.define('User' , {
    id  : {
        type : DataTypes.BIGINT ,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type: DataTypes.STRING ,
        allowNull : false
    }
},{tableName : 'User'});

module.exports = userSchema;
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbFunctions");

const categorySchema = sequelize.define('Category' , {
    id : {
        type : DataTypes.BIGINT , 
        allowNull : false ,
        autoIncrement : true, 
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING , 
        allowNull : false 
    },
    description : {
        type : DataTypes.STRING ,
        allowNull : false
    }
}, {freezeTableName: true});

module.exports = categorySchema;
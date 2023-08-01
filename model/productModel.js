// this is like Schema for SQL  DB

const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbFunctions");

const productSchema = sequelize.define('Product' , {
    id : {
        type : DataTypes.BIGINT ,
        allowNull : false ,
        autoIncrement: true , 
        primaryKey : true
    },
    title : {
        type:DataTypes.STRING ,
        allowNull : false
    },
    image : {
        type : DataTypes.STRING ,
        allowNull : false
    },
    description : {
        type : DataTypes.STRING ,
        allowNull : false
    },
    price : {
        type : DataTypes.DOUBLE ,
        allowNull : false
    },
    rating : {
        type : DataTypes.INTEGER ,
        allowNull : false
    }, 
}, {tableName: 'products'})

module.exports = productSchema;
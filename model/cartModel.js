const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbFunctions");

const CartSchema = sequelize.define('cart' , {
    id:{
        type : DataTypes.BIGINT,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true
    }
}, {tableName : 'Cart'});

module.exports = CartSchema;
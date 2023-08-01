const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbFunctions");

const CartItemSchema = sequelize.define('cartItem' , {
    id:{
        type : DataTypes.BIGINT,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true
    },
    quantity : {
        type : DataTypes.BIGINT ,
        allowNull : false 
    }
}, {tableName : 'CartItem'});

module.exports = CartItemSchema;
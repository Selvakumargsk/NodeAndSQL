const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbFunctions");

const OrderItemSchema = sequelize.define('OrderItem' , {
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
}, {tableName : 'OrderItem'});

module.exports = OrderItemSchema;
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbFunctions");

const OrderSchema = sequelize.define('Order' , {
    id:{
        type : DataTypes.BIGINT,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true
    }
}, {tableName : 'Order'});

module.exports = OrderSchema;
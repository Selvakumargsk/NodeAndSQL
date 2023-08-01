const mysql = require('mysql2/promise');    //diff of requiring mysql2 and mysql2/promise is related to db executions type


// const db = mysql.createPool({         //using createConnection done a connection everytime where using createPool, reusing the existing connection
//   host : 'localhost' , 
//   user : 'root' ,
//   password : 'root123' ,
//   database : 'node_ecommerce_app'
// });

// module.exports = db ;

      //OR

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_ecommerce_app' , 'root' , 'root123' , {
  host : 'localhost',
  dialect : 'mysql'
})  
module.exports = sequelize;

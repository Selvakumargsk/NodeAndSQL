const mysql = require('mysql2/promise');    //diff of requiring mysql2 and mysql2/promise is related to db executions type


// const db = mysql.createPool({         //using createConnection done a connection everytime where using createPool, reusing the existing connection
//   host : 'localhost' , 
//   user : 'root' ,
//   password : 'root' ,
//   database : 'node_ecommerce_app'
// });

// module.exports = db ;

      //OR

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_ecommerce_app' , 'root' , 'root' , {
  host : 'localhost',
  dialect : 'mysql',
  dialectOptions: {
    multipleStatements: true, // Allows running multiple SQL statements
    createDatabase: true, // Create the database if it doesn't exist
  },
})  
module.exports = sequelize;

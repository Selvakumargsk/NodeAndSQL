const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');     // to provide relative path
const rootDir = require('./utils/path');    //this is to provide path of main page by using this we access any file from folder where this practiceApp.js exist
const session = require('express-session');

//routes
const homeRoutes = require('./routes/home');   //in this file we route to html page
const totalRoutes = require('./routes/router');
const categoryRoutes = require('./routes/categoryRoutes');
//routes

//Sequelize db functions
const sequelize = require('./utils/dbFunctions.js');
const productSchema = require('./model/productModel');
const categorySchema = require('./model/categoryModel');
const userSchema = require('./model/userModel');
const CartSchema = require('./model/cartModel');
const CartItemSchema = require('./model/cartItemModel');
const OrderSchema = require('./model/OrderModel');
const OrderItemSchema = require('./model/OrderItemModel');
//Sequelize db functions

app.use(bodyParser.urlencoded({ extended: false }));


// Embedded JS template for dynamically accepting values
app.set('view engine' , 'ejs');
app.set('views' , 'views');   //app defaultly search on views folder for ejs templates, if there is other than views folder we have to set which one to take 
//EJS

//bootstrap file serving from node modules
app.use('/css' , express.static(path.join(rootDir , 'node_modules' , 'bootstrap' , 'dist' , 'css')))
//bootstrap

//for every static files
app.use(express.static(path.join(__dirname , 'staticFiles')));
//every static files

//static files CSS serving
// app.use('/CSS/style.css' , (req , res)=>{
//   res.sendFile(path.join(rootDir , 'staticFiles' , 'CSS' , 'style.css'));
// });

app.use(session({
  secret : 'selvaselva' ,
  resave : false,
  saveUninitialized : false
}))

// app.use((req , res , next)=>{
//   userSchema.findByPk(1).then((user)=>{
//     req.User = user;
//     next()
//   })
// })

app.use((req, res, next) => {
  if (!req.session.user) {
    userSchema
      .findByPk(1)
      .then((user) => {
        req.User = user;
        next();
      })
      .catch((err) => {
        console.log('Error fetching user:', err);
        next();
      });
  } else {
    if (req.session.user) {
      res.locals.user = req.session.user; // Make user data available in all views
      next(); // If user is already logged in, proceed to the next middleware
    }
  }
});


//Routes
app.use(homeRoutes);
app.use(totalRoutes);
app.use('/category' , categoryRoutes);
// app.use((req , res)=>{
//   res.status(404).send("page not found")
// })
app.use((req , res)=>{
  const viewsData = {
    pageTitle: 'Page not Found'
  }
  res.status(404).render('404' , viewsData)
})
//Routes

//SQL db authetication
sequelize.authenticate().then(()=>{
  console.log('SQL db autheticated successfully');
}).catch(err=>console.log('authentication failed ', err ));
//db authentication

//Association among databases
// Define associations in categorySchema
categorySchema.belongsTo(userSchema, { foreignKey: 'UserId' });
categorySchema.hasMany(productSchema, { foreignKey: 'CategoryId' });

// Define associations in productSchema
productSchema.belongsTo(categorySchema, { foreignKey: 'CategoryId' });
productSchema.belongsTo(userSchema, { foreignKey: 'UserId' });
productSchema.belongsToMany(CartSchema , {through : CartItemSchema});
productSchema.belongsToMany(OrderSchema , {through : OrderItemSchema});

// Define associations in userSchema
userSchema.hasMany(categorySchema, { foreignKey: 'UserId' });
userSchema.hasMany(productSchema, { foreignKey: 'UserId' });
userSchema.hasOne(CartSchema);
userSchema.hasMany(OrderSchema);

// Define associations in CartSchema
CartSchema.belongsTo(userSchema);
CartSchema.belongsToMany(productSchema , {through : CartItemSchema});

OrderSchema.belongsTo(userSchema);
OrderSchema.belongsToMany(productSchema , {through : OrderItemSchema});



//db creating table
sequelize.sync().then((result)=>{
  return userSchema.findByPk(1)
}).then((user)=>{
  if(!user){
    userSchema.create({name:'selva' , email: 'selva@gmail.com' , password : "selvaselva" })
  }
}).catch(err=>console.log(err));


// const prod1 = {
//   title: "amsle",
//   image : 'duugiuy',
//   description : "ytfgcug" ,                //this is example way to insert data in database in sequelize method
//   price : 2.76 ,
//   rating : 3
// }

// const product = productSchema.build(prod1);         //like class extent keyword
// product.save().then(result=>console.log(result)).catch(err=>console.log(err));                                     //this is to save the entered value in database
                    //OR
// productSchema.create(prod1).then(res=>console.log(res)).catch(err=>console.log(err));                    

app.listen(3500, console.log("server running on port 3500"))
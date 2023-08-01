const categorySchema = require("../../model/categoryModel");
const productSchema = require("../../model/productModel");
const userSchema = require("../../model/userModel");
const session = require('express-session');


exports.getLogin=(req , res)=>{
const viewsData = {
    pageTitle : 'Login',
    user : req.session.user? req.session.user : "user"
};
res.render('login' , viewsData)
};

exports.getRegister=(req , res)=>{
    const viewsData = {
        pageTitle : 'Register'
    };
    res.render('register' , viewsData)
};

exports.postUser = (req , res)=>{
    userSchema.create(req.body).then((user)=>{
        req.session.user = user;
        productSchema.findAll({include:[{model :categorySchema} , {model : userSchema}]}).then((result)=>{              //db model findAll method
            const viewsData = {
                admin : false,
                pageTitle : 'Home - ProductList',
                products : result.map((product) => product.dataValues)
            }
           res.render('products' , viewsData)
        }).catch(err=>console.log(err));   
    })
};

exports.postLogin = (req, res) => {
    const { email, password } = req.body;
  
    // Find the user with the provided email
    userSchema
      .findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          // If user found, check if the password matches
          if (user.password === password) {
            // Set the user in the session
            req.session.user = user;
            console.log(req.session.user);
            // Redirect to the products page
            return res.redirect('/');
          }
        }
  
        // If no user found or password doesn't match, render the login page with an error message
        const viewsData = {
          pageTitle: 'Login',
          error: 'Invalid email or password',
        };
        res.render('login', viewsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  };
  
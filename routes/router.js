const express = require('express');
const router = express.Router();
// const productsData = require('../utils/product');
const {  postProducts, getAddProducts, getAdminProductsPage, getEditProduct, postUpdatedProducts, getDeleteProduct, deleteCartItem } = require('../controller/routes/productController');
const { getMainpage } = require('../controller/routes/routes');
const { getCartItems, postCartItems } = require('../controller/routes/cartController');
const { postOrderPage, getOrderPage } = require('../controller/routes/orderController');
const { getLogin, postUser, postLogin, getRegister,  } = require('../controller/routes/loginController');

    // router.get('/products/add', (req, res) => {
  //   const viewsData = {
  //       pageTitle : 'Add a Prodct'
  //   }
  //   res.render('addProduct' , viewsData);
  // });
   
  // router.post('/products/add' ,(req , res)=>{
  //   const product = {
  //       title : req.body.title
  //   };
  //   productsData.addProduct(product);
  //   res.redirect('/products')
  // })



router.get('/products/add' , getAddProducts);  

router.post('/products/add' , postProducts);

router.get('/cart' , getCartItems);

router.post('/cart' , postCartItems);

router.get('/admin' , getAdminProductsPage);

router.get('/products/Edit/:productId', getEditProduct);

router.post('/products/Edit/:productId' , postUpdatedProducts);

router.get('/products/Delete/:productId' , getDeleteProduct);

router.post('/deleteCart' , deleteCartItem);

router.post('/order' , postOrderPage);

router.get('/order' , getOrderPage);

router.get('/login' , getLogin);

router.post('/login' , postLogin);

router.get('/register' , getRegister);

router.post('/register' , postUser);


module.exports = router;
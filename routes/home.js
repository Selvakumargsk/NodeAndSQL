const express = require('express');
const router = express.Router();
const path = require('path')
// const productData = require('../utils/product');
const { getProducts, getProductDetails } = require('../controller/routes/productController');


// router.get('/products' , (req , res)=>{
//     const viewsData ={
//         products: productData.products ,
//         pageTitle : 'Home Page - Products List'
//     }
//     res.render('products' , viewsData)

//     // res.sendFile(path.join(__dirname, '../' , 'views' , 'header.html'))
// })


//with the use of controller page we code in seperate js file for the below request
router.get('/' , getProducts);

router.get('/products/productdetails/:id' , getProductDetails)

module.exports = router;
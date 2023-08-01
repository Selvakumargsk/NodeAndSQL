// const { products, addProduct } = require("../../utils/product") //instead of this , create new product content from model folder

const { where } = require("sequelize");
const { deleteCartProductById } = require("../../model/cart");
const { getAllProducts, saveProduct, getProductById, updatedProductById, deleteProductBYId } = require("../../model/product");
const productSchema = require("../../model/productModel");
const categorySchema = require("../../model/categoryModel");
const userSchema = require("../../model/userModel");
const CartItemSchema = require("../../model/cartItemModel");





//these all functions are to manage products in local JSON file using FileSystem module

exports.getAddProducts = (req , res)=>{
    categorySchema.findAll({attributes:['id' , 'title']}).then(categories=>{
        const viewsData = {
            edit : false , 
            categories,
            pageTitle : 'Add a Prodct'
        }
        res.render('addProduct' , viewsData);
    }).catch(err=>console.log(err))
   
}

// exports.postProducts = (req , res)=>{
//     console.log(req.body);
//     const product = {
//         id : Date.now(),
//         title : req.body.title,
//         image : req.body.image ,
//         price : req.body.price ,
//         description : req.body.description ,
//         rating : req.body.rating ,
//     };
//     saveProduct(product);
//     res.redirect('/')
// };

// exports.getProducts =  async(req , res)=>{
//     getAllProducts((products)=>{
//         const viewsData ={
//             admin : false,
//             products: products ,
//             pageTitle : 'Home Page - Products List'
//         }
//         res.render('products' , viewsData)
//     })    
// };


// exports.getProductDetails = (req , res)=>{
//     const id = req.params.id;
//     getProductById(id , (product)=>{
//         const viewsData = {
//             product : product ,
//             pageTitle : 'ProductDetails'
//         }
//         res.render('productDetails' , viewsData)
//     });
// }
//     //Or
//     //create function here this will also work like the above
    
//     // exports.getProductDetails = (req , res)=>{
//     // getAllProducts((products)=>{
//     //     products.forEach(product => {
//     //         if(product.id == id){
//     //             var viewsData = {
//     //                 product : product ,
//     //                 pageTitle : 'ProductDetails'
//     //             }
//     //             res.render('productDetails' , viewsData)    
//     //         }
//     //     });
//     // })    }


// exports.getAdminProductsPage = (req , res)=>{
//     getAllProducts((products)=>{
//         const viewsData = {
//             admin : true ,
//             products : products ,
//             pageTitle : 'Admin-Page'
//         }
//         res.render('products' , viewsData)
//     })
// }

// exports.getEditProduct = (req , res)=>{
//     const id = req.params.productId;
//     getProductById(id , (product)=>{
//        const viewsData = {
//         edit : true , 
//         product : product ,
//         pageTitle : 'Edit-Product'
//        }
//        res.render('addProduct', viewsData);
//     })
// }

// exports.postUpdatedProducts = (req , res)=>{
//     const updatedProduct = {
//         id : req.params.productId ,
//         title : req.body.title ,
//         image : req.body.image ,
//         price : req.body.price ,
//         description : req.body.description ,
//         rating : req.body.rating 
//     }
//    updatedProductById(updatedProduct , req.params.productId);
//    res.redirect('/')
// };

// exports.getDeleteProduct = (req , res)=>{
//     const deleteId = req.params.productId;
//     deleteProductBYId(deleteId);
//     deleteCartProductById(deleteId);
//     res.redirect('/')
// }

// exports.deleteCartItem = (req , res) =>{
//     const deleteId = req.body.productId;
//     deleteCartProductById(deleteId);
//     res.redirect('/cart')
// }

//these all functions are to manage products in local JSON file using FileSystem module



//here all the above functions are changed for database management


exports.getProducts = (req , res)=>{

    productSchema.findAll({include:[{model :categorySchema} , {model : userSchema}]}).then((result)=>{              //db model findAll method
        const viewsData = {
            admin : false,
            pageTitle : 'Home - ProductList',
            products : result.map((product) => product.dataValues)
        }
       res.render('products' , viewsData)
    }).catch(err=>console.log(err));


    // getAllProducts().then(([data , field])=>{
    //     const viewsData ={
    //         admin : false,
    //         pageTitle : 'Home - ProductList',            //db query method
    //         products : data
    //     }
    //     res.render('products' , viewsData)
    // }).catch(err=>console.log(err));
};

exports.getAdminProductsPage = (req , res)=>{

     productSchema.findAll({include:[{model :categorySchema} , {model : userSchema}]}).then((result)=>{              //db model findAll method
        const viewsData = {
            admin : true,
            pageTitle : 'Admin - ProductList',
            products : result
        }
       res.render('products' , viewsData)
    }).catch(err=>console.log(err));


    // getAllProducts().then(([data , field])=>{
    //     const viewsData ={
    //         admin : true,
    //         pageTitle : 'Home - ProductList',            //db query method 
    //         products : data
    //     }
    //     res.render('products' , viewsData)
    // }).catch(err=>console.log(err));
};

exports.postProducts = (req , res)=>{
   
    const product = {
        title : req.body.title,
        image : req.body.image ,
        price : req.body.price ,
        description : req.body.description ,
        rating : req.body.rating ,
        CategoryId : req.body.Category,
        UserId : req.User.id
    };
    req.User.createProduct(product).then(()=>{
        res.redirect('/')                       //this is sequelize model create method to post products in db 
    }).catch(err=>console.log(err));

    // productSchema.build(product).save().then((savedProduct)=>{
    //     return savedProduct.getUser()
    //     // res.redirect('/')                                   //this is sequelize model build and save method to post products in db 
    // }).then((user) => {
    //     console.log(user);
    //     // user will contain the associated User data
    //     console.log(user.name);
    //     res.redirect('/');
    //   }).catch(err=>console.log(err));

    //sequelize model build and save method is used to update the row also

    // saveProduct(product);               //this method in model to post product by writing query in sql
    // res.redirect('/')
};

exports.getDeleteProduct = (req , res)=>{
    const deleteId = req.params.productId;
   productSchema.destroy({where:{id:deleteId}}).then((result)=>console.log(result)).catch(err=>console.log(err));  //db model destroy method
    // deleteProductBYId(deleteId);                                                                                //db execute method
    // deleteCartProductById(deleteId);
    res.redirect('/')
};

exports.getProductDetails = (req , res)=>{
    const id = req.params.id;
    productSchema.findByPk(id).then(result=>{                   //db model find method
        const viewsData = {
            product : result ,
            pageTitle : 'ProductDetails'
        };
        res.render('productDetails' , viewsData)
    }).catch(err=>console.log(err))

    // getProductById(id).then(([product , fieldData])=>{
    //     const viewsData = {
    //         product : product[0] ,
    //         pageTitle : 'ProductDetails'                         //db query method
    //     };
    //     res.render('productDetails' , viewsData)
    // }).catch(err=>console.log(err))
};

exports.getEditProduct = (req , res)=>{
    const id = req.params.productId;
    let viewsData = {
        edit : true , 
        pageTitle : 'Edit-Product'
       }
    productSchema.findByPk(id).then((product)=>{                                //db model method
       viewsData = {...{product} , ...viewsData};
       return categorySchema.findAll({attributes:['id' , 'title']})        
    }).then((categories)=>{
        viewsData = {...{categories} , ...viewsData};
        res.render('addProduct' , viewsData)
    }).catch(err=>console.log(err));

    // res.render('addProduct', viewsData);

    // getProductById(id).then(([product , fieldData])=>{                       //db execute method
    //  const viewsData = {
    //     edit : true , 
    //     product : product[0] ,
    //     pageTitle : 'Edit-Product'
    //    }
    //    res.render('addProduct', viewsData);   
    // }).catch(err=>console.log(err))
};

exports.postUpdatedProducts = (req , res)=>{                    //db model update method
    const id = req.params.productId;
    const updatedProduct = {
       title : req.body.title ,
       image : req.body.image ,
       price : req.body.price ,
       description : req.body.description ,
       rating : req.body.rating,
       CategoryId : req.body.Category 
    }
    productSchema.update(updatedProduct , {where:{id:id}})

//    updatedProductById(updatedProduct , req.params.productId);            //db execute method where updatedProduct should be an array
   res.redirect('/')
};


exports.deleteCartItem = (req, res) => {
    const deleteId = req.body.productId;
      req.User.getCart()
      .then(cart => {
        if (!cart) {
          return res.status(404).send('Cart not found');
        }
          return CartItemSchema.findOne({
          where: {
            cartId: cart.id,
            productId: deleteId,
          },
        });
      })
      .then(cartItem => {
        if (!cartItem) {
          return res.status(404).send('Cart item not found');
        }
        return cartItem.destroy();
      })
      .then(() => {
        res.status(200).redirect('/cart');
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error occurred while deleting the cart item');
      });
  };

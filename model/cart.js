const fs = require('fs');
const path =  require('path');
const rootDir = require('../utils/path');



exports.fetchCartDetailsFromFile = (callback)=>{
   const cartPath = path.join(rootDir , 'data' , 'cart.json');   
   fs.readFile(cartPath , (error , cartData)=>{
      let cart = {products:[]};
  if(!error){
    cart = JSON.parse(cartData);
  }  
  return callback(cart);
   })
}

exports.addProductToCart=(productId , productPrice)=>{
const cartPath = path.join(rootDir , 'data' , 'cart.json');
// fs.readFile(cartPath , (error , cartData)=>{
//     let cart = {products:[] , totalPrice:0};
//   if(!error){
//     cart = JSON.parse(cartData);
//   }  

this.fetchCartDetailsFromFile(cart=>{
   let existingProductIndex = cart.products.findIndex((prod)=> prod.id.toString() === productId) 
   let updatedProduct;
   
   if(existingProductIndex != -1){
      updatedProduct = cart.products[existingProductIndex];
      updatedProduct.quantity +=1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
   }else{
      updatedProduct = {id: productId , quantity: 1};
      cart.products = [...cart.products , updatedProduct];
   }
   
   fs.writeFile(cartPath , JSON.stringify(cart) , error=>{
      console.log(error);

})
// }) 
})
}

exports.deleteCartProductById =(deleteId)=>{
   const cartPath = path.join(rootDir , 'data' , 'cart.json');
   this.fetchCartDetailsFromFile(cart =>{
      const cartProducts = [...cart.products]
      const updatedCart = cartProducts.filter((prod)=>prod.id.toString() !== deleteId.toString());
      fs.writeFile(cartPath , JSON.stringify({products: updatedCart}) , (error)=>{
         console.log(error);
      })
   })
}
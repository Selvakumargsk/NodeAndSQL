const {
  addProductToCart,
  fetchCartDetailsFromFile,
} = require("../../model/cart");
const Cart = require("../../model/cartModel");
const { getProductById, getAllProducts } = require("../../model/product");
const product = require("../../model/productModel");

exports.postCartItems = (req, res) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.User.getCart()
    .then((cart) => {
      if (!cart) {
        return req.User.createCart();
      }
      return cart;
    })
    .then((cart) => {
      fetchedCart = cart;
      return product.findByPk(productId);
    })
    .then((products) => {
      if (!products) {
        return res.status(404).send("product not found");
      }
      return fetchedCart
        .getProducts({ where: { id: productId } })
        .then((cartProducts) => {
          if (cartProducts.length > 0) {
            const existingProduct = cartProducts[0];
            const newQuantity = existingProduct.cartItem.quantity + 1;
            return existingProduct.cartItem.update({ quantity: newQuantity });
            // return fetchedCart.addProduct(products , {through : {quantity : newQuantity}});
          } else {
            return fetchedCart.addProduct(products, {
              through: { quantity: 1 },
            });
          }
        });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error occurred while adding the item to the cart.");
    });

  // getProductById(productId , (product)=>{
  //  addProductToCart(productId , product.price);
  // //  res.redirect('/');
  // res.redirect(req.get('referer'))
  // })
};

exports.getCartItems = (req, res) => {
  let gainedCart;
  let totalPrice;
  req.User.getCart()
    .then((cart) => {
      return (gainedCart = cart);
    })
    .then(() => {
      if(gainedCart) {
      return gainedCart.getProducts();
      }else{
        return false
      }
    })
    .then((products) => {
      if(products){
       let arr=[];
      products.forEach(element => {
         arr.push(element.cartItem.quantity * element.price);
      });
      (arr.length>0) ? totalPrice = arr.reduce((a , b)=> a+b) : totalPrice=0;
      const viewsData = {
        totalPrice : totalPrice,
        products,
        pageTitle: "Cart - Products",
      };
      res.render("cartPage", viewsData);
    }else{
      const viewsData={
        totalPrice : 0,
        products : [],
        pageTitle : "Cart - Products"
      }
      res.render("cartPage", viewsData);
    }
    });

  // fetchCartDetailsFromFile((cartItems)=>{
  //    const cartProducts = [...cartItems.products];
  //    getAllProducts(products=>{
  //      const matchedCartItems = cartProducts.map((prod)=>{
  //          const matchedItems = products.find((cartProd)=>cartProd.id == prod.id)
  //          return {...prod , ...matchedItems}
  //       })
  //       let totalPrice;
  //       if(matchedCartItems.length ==0){
  //          totalPrice = "";
  //       }else{
  //          totalPrice = matchedCartItems?.map((x)=>parseInt(x.quantity)*parseInt(x.price))?.reduce((a , b)=> a+b );
  //       }
  //       const viewsData={
  //          totalPrice,
  //          products : matchedCartItems ,
  //          pageTitle : 'Cart - Products'
  //       }
  //       res.render('cartPage' , viewsData);
  //    })
  // })
};

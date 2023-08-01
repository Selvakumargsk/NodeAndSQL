const productSchema = require("../../model/productModel");

exports.postOrderPage = (req , res)=>{
    let productObj;
    let fetchedCart;
    req.User.getCart().then(cart=>{
        fetchedCart = cart
       return cart.getProducts()
    }).then(products=>{
        productObj = products
       return req.User.createOrder()
    }).then(order=>{
        let productData = productObj.map(product=>{
            product.OrderItem = {quantity : product.cartItem.quantity}
            return product
        })
        return order.addProducts(productData);
    }).then(()=>{
        fetchedCart.setProducts(null)
    }).then(()=>{
        res.status(200).redirect('/order');
    }).catch(err=>{
        console.log(err);
    })
};

exports.getOrderPage = (req , res)=>{
    req.User.getOrders({include : productSchema}).then((orders)=>{
        const viewsData = {
            pageTitle : `${req.User.name } orders`,
            orders
        }
        res.render('OrderPage' , viewsData);
    })
}
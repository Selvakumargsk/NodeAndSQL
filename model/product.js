const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const db = require("../utils/dbFunctions.js");

//these all functions are to manage products in local JSON file using FileSystem module

// const fetchProductDataFromFile = (callback)=>{
//     const productPath = path.join(rootDir , 'data' , 'products.json');
//     fs.readFile(productPath , (error , productData)=>{
//         if(error){
//             callback([]);
//         }
//         callback(JSON.parse(productData));
//     })
//     }

// exports.saveProduct = async(product)=>{
//     const productPath = path.join(rootDir , 'data' , 'products.json');

//     fetchProductDataFromFile((productData)=>{
//         productData.push(product);
//      fs.writeFile(productPath , JSON.stringify(productData) , (error)=>{
//         console.log(error);
//      })
//     })
// };

// exports.getAllProducts = (callback)=>{
//     // const productPath = path.join(rootDir , 'data' , 'products.json');

//     fetchProductDataFromFile((productData)=>{
//         callback(productData)
//     })
//     //  fs.readFile(productPath , (error , productData)=>{
//     //     const products = JSON.parse(productData);
//     //     callback(products)
//     // })
// }

// exports.getProductById = (productId , callback)=>{
//     fetchProductDataFromFile((products)=>{
//         const requiredProduct = products.find((product)=>product.id == productId);
//         callback(requiredProduct);
//     })
// };

// exports.updatedProductById = (productToUpdate , productId)=>{
//     const productPath = path.join(rootDir , 'data' , 'products.json');
//     fetchProductDataFromFile((products)=>{
//         const indexOfUpdatedProduct = products.findIndex((prod)=> prod.id.toString() === productId);
//         const updatedProductList = [...products];
//         updatedProductList[indexOfUpdatedProduct] = productToUpdate;
//         fs.writeFile(productPath , JSON.stringify(updatedProductList) , (error)=>{
//             console.log(error);
//         })
//     })
// };

// exports.deleteProductBYId = (productId) =>{
//     const productPath = path.join(rootDir , 'data' , 'products.json');
//     fetchProductDataFromFile((products)=>{
//         const indexOfProductToDelete = products.findIndex((prod)=> prod.id.toString() === productId);
//         const productsToDeleteById = [...products];
//         productsToDeleteById.splice(indexOfProductToDelete , 1);
//         fs.writeFile(productPath , JSON.stringify(productsToDeleteById) , (error)=>{
//             console.log(error);
//         })
//         })
// };
//these all functions are to manage products in local JSON file using FileSystem module

//here all the above functions are changed for database management

// SQL functions

// db.execute(`select * from products` , (error , result , field)=>{
//   console.log(error , result , field);                             //if mysql required this functions will work
// })
// db.execute(`select * from products`).
// then(([data , field])=>console.log(data)).catch((error)=>console.log(error));   //if mysql/promise required this functions will work

exports.getAllProducts = () => {
  return db.execute(`SELECT * FROM products`);
};

exports.saveProduct = async (product) => {
    db.execute(
      `INSERT INTO products (title, description, image, price, rating) VALUES (?, ?, ?, ?, ?)`,
      [
        product.title,
        product.description,
        product.image,
        product.price,
        product.rating,
      ]
    );
  };

exports.deleteProductBYId = (productId) =>{
  db.execute(`DELETE FROM products WHERE id=${productId}`)  
};

exports.getProductById = (productId)=>{
  return db.execute(`SELECT * FROM products WHERE id=${productId}`)
};
  

exports.updatedProductById = (productToUpdate , productId)=>{
   db.execute(`UPDATE products SET title=? , image=? , price=? , description=? , rating=? WHERE id=${productId}`,productToUpdate)
};

//sql db functions

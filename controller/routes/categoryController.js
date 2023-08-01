const categorySchema = require("../../model/categoryModel");
const userSchema = require("../../model/userModel");

exports.getAddCategory=(req , res)=>{
    const viewsData = {
        pageTitle : 'Add Ctegories'
    }
    res.render('getAddCategory' , viewsData);
};

exports.ListAllCategories = (req, res) => {
    categorySchema
      .findAll({
        include: [userSchema],
      })
      .then((result) => {
        const viewsData = {
          pageTitle: 'All Categories',
          categories: result,
        };
        res.render('CategoryData', viewsData);
      })
      .catch((err) => console.log(err));
  };
  

// exports.ListAllCategories = (req , res)=>{
//     categorySchema.findAll({include:userSchema}).then(result=>{
//         // console.log(result);
//         const viewsData = {
//             pageTitle : 'All Ctegories',
//             categories : result
//         }
//         res.render('CategoryData' , viewsData)   
//     }).catch(err=>console.log(err))
//    };

exports.postAddCategory = (req , res)=>{
    const category ={
        title : req.body.title , 
        description : req.body.description,
    }

    req.User.createCategory(category).then(()=>{
        res.redirect('/category');
    }).catch(err=>console.log(err));
};
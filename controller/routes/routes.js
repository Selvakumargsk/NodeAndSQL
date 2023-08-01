exports.getMainpage = (req , res)=>{
    const viewsData = {
        pageTitle: 'Homepage'
      }
      res.render('home' , viewsData);
}
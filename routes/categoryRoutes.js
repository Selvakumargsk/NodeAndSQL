const express = require('express');
const { getAddCategory, postAddCategory, ListAllCategories } = require('../controller/routes/categoryController');
const router = express.Router();

router.get('/AddCategory' , getAddCategory);

router.post('/postAddCategory' , postAddCategory);

router.get('/' , ListAllCategories)

module.exports = router;
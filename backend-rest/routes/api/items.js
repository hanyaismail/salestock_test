const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../Helper/helper');
const uploadHandler = require('../../Helper/uploadHandler');

// items controller
const itemsController = require('../../controller/items.controller');

// @route GET api/items
// @desc Get All Items 
// @access Public
router.get('/', itemsController.getAllItems)

// @route GET api/items/search
// @desc Search Items 
// @access Public
router.get('/search', itemsController.searchItem)

// @route GET api/items
// @desc Get an item 
// @access Public
router.get('/:id', itemsController.getItem)

// @route GET api/items/slug
// @desc Get an item by slug
// @access Public
router.get('/slug/:slug', itemsController.getItemBySlug)

// @route POST api/items
// @desc Create A Post 
// @access Public
router.post('/', uploadHandler, itemsController.addItem)

// @route DELETE api/items/:id
// @desc Delete A Post 
// @access Public
router.delete('/:id', itemsController.deleteItem)



module.exports = router;
const Item = require('../model/Item');
const Helper = require('../Helper/helper');
const slugify = require('slugify');
const cloudinary = require('cloudinary');
const { cloudinaryConfig } = require('../config/keys');

cloudinary.config({
	cloud_name: cloudinaryConfig.cloudName,
	api_key: cloudinaryConfig.apiKey,
	api_secret: cloudinaryConfig.apiSecret
})

module.exports.getAllItems = async function(req, res) {
    
    try {
        let limit = 3;
        if(req.query.limit) {
            limit = parseInt(req.query.limit)
        }

        let page = 1;
        if(req.query.page) {
            page = parseInt(req.query.page)
        }

        let item = await Item.paginate({}, { page: page, limit: limit })
        let meta = {
            "total": item.total,
            "limit": item.limit,
            "page": item.page,
            "pages": item.pages
        }

        return Helper.response(res, code=200, success=true, data=item.docs, message="All items", meta=meta)
    } catch (err) {
        return Helper.response(res, code=400, success=false, data=[], message=err.message)
    }
}

module.exports.searchItem = async function(req, res) {
    try {
        let name = req.query.name
        console.log(name)
        let item = await Item.find({name: { $regex: '.*' + name + '.*' }}).sort({date: -1}).limit(5)
        return Helper.response(res, code=200, success=true, data=item, message="All items")
    } catch (err) {
        return Helper.response(res, code=400, success=false, data=[], message=err.message)
    }
}

module.exports.addItem = async function(req, res) {
    try {
        console.log(req.file)
        const cloudResult = await cloudinary.uploader.upload(req.file.path);
        console.log(cloudResult)
        const newItem = new Item({
            name: req.body.name,
            price: req.body.price,
            color: req.body.color,
            detail: req.body.detail,
            size: req.body.size,
            slug: slugify(req.body.name),
            pictUrl: cloudResult.secure_url
        })

        let item = await newItem.save()
        return Helper.response(res, code=200, success=true, data=item, message="Item added")
    } catch (err) {
        return Helper.response(res, code=400, success=false, data=[], message=err.message)
    }
}

module.exports.getItem = async function(req, res) {
    try {
        let item = await Item.findById(req.params.id)
        data = [item]
        return Helper.response(res, code=200, success=true, data=data, message="Get item")
    } catch (err) {
        return Helper.response(res, code=400, success=false, data=[], message=err.message)
    }
}

module.exports.getItemBySlug= async function(req, res) {
    try {
        let item = await Item.findOne({slug: req.params.slug})
        data = [item]
        return Helper.response(res, code=200, success=true, data=data, message="Get item")
    } catch (err) {
        return Helper.response(res, code=400, success=false, data=[], message=err.message)
    }
}

module.exports.deleteItem = async function(req, res) {
    try {
        let item = await Item.findById(req.params.id)
        await item.remove()
        return Helper.response(res, code=200, success=true, data=[], message="Item deleted")
    } catch (err) {
        return Helper.response(res, code=400, success=false, data=[], message=err.message)
    }
}
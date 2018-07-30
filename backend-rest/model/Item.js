const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Size = new Schema({
    size: String,
    height: Number,
    bust: Number,
    waist: Number,
    shoulderWidth: Number,
    armLength: Number,
    wrist: Number
})

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: [Size],
    pictUrl: {
        type: String,
        required: false
    },
    detail: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: true
    },
    is_returnable: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

ItemSchema.plugin(mongoosePaginate);

module.exports = Item = mongoose.model('Item', ItemSchema);
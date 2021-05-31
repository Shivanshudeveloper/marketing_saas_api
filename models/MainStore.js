const mongoose = require('mongoose');

const usersMainStoreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    brandname: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    length: {
        type: String,
        required: false
    },
    length: {
        type: String,
        required: false
    },
    shipfrom: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    blackowned: {
        type: String,
        required: false
    },
    websiteurl: {
        type: String,
        required: false
    },
    downloadUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const mainStore = mongoose.model('mainstore', usersMainStoreSchema)
module.exports = mainStore
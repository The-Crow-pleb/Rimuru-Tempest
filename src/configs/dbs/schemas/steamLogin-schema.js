const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const dbdSchema = mongoose.Schema({
    _id: reqString,
    steam: reqString,
    userID: reqString
})

module.exports = mongoose.model('idsDBD', dbdSchema)
//model name is singular and table name is plural
//in mongodb we use collection word for tables
//ex - here model is menu then table name will bi menus

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const menuSchema = new Schema({
    name : {type: String , required : true},
    image : {type: String , required : true},
    price : {type: Number , required : true},
    size : {type: String , required : true},
})

module.exports = mongoose.model('Menu' , menuSchema)

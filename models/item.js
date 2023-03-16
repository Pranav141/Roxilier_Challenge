const mongoose = require('mongoose');
const item=mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        minLength:[10,'Title is Small'],
        // maxLength:[100,'Title is Large']
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        minLength:[20,'Description Too small'],
        // maxLength:[500,'Description Too Large']
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    sold:{
        type:Boolean,
        required:true
    },
    dateOfSale:{
        type:Date,
    }
})
module.exports =new mongoose.model('Items',item)
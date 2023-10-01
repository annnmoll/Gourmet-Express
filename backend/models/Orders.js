const mongoose = require('mongoose') ;


const orders =  new mongoose.Schema({
 
 
 email : {
    type : String , 
    required : true  , 
    unique : true 
 } ,
 orderData :{
    type : Array , 
    required : true 
 }
 
}) ;

module.exports = mongoose.model('Orders' , orders)
const mongoose = require('mongoose') ; 


const userData = new  mongoose.Schema({
    name :{
        type : String , 
        required  : true 
    } ,
    location:{
        type : String , 
        required : true ,
    } , 
    email :{
        type : String , 
        required : true 
    } , 
    password :{
        type : String , 
        required : true 
    } , 
    data :{
        type : Date ,
        default : Date.now
    
    }
})


module.exports = mongoose.model('User' , userData)
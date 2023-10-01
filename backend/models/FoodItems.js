const mongoose = require('mongoose') ; 


const foodItems = new mongoose.Schema({
    CategoryName :{
        type : String  ,
        require : true 
    } , 
    name :{
        type : String , require : true 
    } ,
    img: {
        type : String , 
        require : true 
    } , 
    options :{
        type: [{ half : String , full : String , regular : String , medium : String , large : String }]
    } , 
    description : {
        type : String  ,
        require : true 
    }
})


module.exports = mongoose.model('FoodItems' , foodItems) ; 
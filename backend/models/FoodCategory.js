const mongoose = require('mongoose') ; 
const foodCategory = {
CategoryName :{
    type : String    , 
    require  :  true 

}
}


module.exports = mongoose.model('FoodCategory' , foodCategory) ; 

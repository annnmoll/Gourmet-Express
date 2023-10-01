const mongoose = require('mongoose');
require('dotenv').config() ; 

const dbConnect = async () => {
  
        await mongoose.connect(process.env.DATABASE,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      ).then( res => console.log('Connected to database successfully'))
      .catch(e => console.log(e)) ; 
  
  
}


module.exports = dbConnect ;  
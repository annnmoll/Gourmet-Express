const Orders = require('../models/Orders')

exports.insertOrder = async(req , res) =>{
    try{
            let  {order_data  ,email , order_date}  = req.body;

            console.log(order_data , email , order_date) ; 
                 

            let eId = await Orders.findOne({'email' : req.body.email}) ;
            if ( !eId ){
                await Orders.create({
                    email : req.body.email , 
                    orderData : {order_data} , 
                    
                }).then(()=> res.json({success : true }))
            }
            else{
                await Orders.findOneAndUpdate({email} ,
                    {$push :  {orderData : order_data} }).then(()=> res.status(200).json({
                        success : true 
                    }))
                }
            
    }catch(e){
        console.log(e) ;
        res.status(500).json({
            success : false ,
            message : 'Failed to order' ,
            error : e.message 
        })
    }
}
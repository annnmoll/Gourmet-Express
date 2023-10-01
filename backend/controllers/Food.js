const FoodItems = require('../models/FoodItems');
const FoodCategory = require('../models/FoodCategory');

exports.getFoodItem = async (req, res) => {
    try {
        const response = await FoodItems.find({});


        res.status(200).json({
            success: true,
            message: 'Successfully fetched all the results ',
            data: response
        });
    } catch (e) {
        
        res.status(500).json({
            success: false,
            message: e.message,
            error: "Failed to fetch food items "
        })
    }

}


exports.getCategory = async (req, res) => {
    try {
        const response = await FoodCategory.find({});
        res.status(200).json({
            success: true,
            message: 'Successfully fetched all the details of food category',
            data: response

        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Failed to get food category',
            error: e.message

        })
    }
}


exports.insertFoodCategory = async (req, res) => {
    try {
        const { CategoryName } = req.body;
        
        await FoodCategory.create({ CategoryName });
        res.status(200).json({
            success: true,
            message: 'Successfully inserted food category' , 
           
        })

    } catch (e) {
        
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}
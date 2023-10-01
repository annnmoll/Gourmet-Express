const express = require('express') ; 
const routes = express.Router() ; 
const {body , validationResult } = require('express-validator') ; 
const {getFoodItem  , getCategory } = require('../controllers/Food') ; 
const { createUser , getUser , sendOtp } = require('../controllers/User');
const {insertOrder} = require('../controllers/Order') ;

routes.get('/getItems' , getFoodItem) ; 
routes.get('/getCategory' , getCategory) ; 


routes.post('/createuser'   , createUser )
routes.post('/getuser' , getUser)


routes.post('/otp' ,[body('email' , 'Incorrect email').isEmail()  , body('password' , 'Password length must be 8').isLength({min:8})], sendOtp )  ; 


routes.post('/insertOrder' ,insertOrder )
module.exports = routes ;   
const express = require('express') ;
const dbConnect = require('./config/database')
require('dotenv').config() ;
const PORT = process.env.PORT
const app = express() ;
const routes = require('./routes/Routes') ;

app.use((req, res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000") ; 
    res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type ,Accept") ;
    next() ; 
})

dbConnect() ; 
app.use(express.json()) ; 
app.use('/' , routes)
app.listen(PORT , ()=> { console.log('App is running on Port' , PORT)}) ; 
app.get('/' , (req ,res) => {res.send('Hello Baby')})
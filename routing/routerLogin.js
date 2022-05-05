const express = require('express')
const router = express.Router()
const dbConnection = require('../database');

//Login
router.get('/',(req,res)=>{
    res.render('login')
})

//Login username pass check Employee
router.post('/auth',(req,res)=>{
   var user = req.body.username
   var pass = req.body.password
   dbConnection.query(`SELECT * FROM user WHERE username = '${user}' AND password = '${pass}';`,(err,result) =>{
       if(err) console.log(err)
       else{
           if(result.length == 0){
               res.redirect('/')
           }
           else {
               req.session.username = user
               req.session.password = pass
               req.session.login = true
               req.session.cookie.maxAge = 900000
               res.redirect('/home')
           }
       }
   })
})

module.exports = router
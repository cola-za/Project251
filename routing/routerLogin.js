const express = require('express')
const router = express.Router()
const dbConnection = require('../database');

//Login
router.get('/',(req,res)=>{
    var count = 0
    for(let i in req.cookies){
        if(req.cookies[i].length < 10){
            res.clearCookie(`${count}`)
            count++
            // console.log(count)
        }
    }
    res.render('login')
})

//Login username pass check Employee
router.post('/auth',(req,res)=>{
   var user = req.body.username
   var pass = req.body.password
   dbConnection.query(`SELECT * FROM user WHERE username = '${user}' AND password = '${pass}';`,(err,result) =>{
       if(err) console.log(err)
       else{
        //    console.log(result)
           if(result.length == 0){
               res.redirect('/')
           }
           else{
                req.session.username = user
                req.session.password = pass
                req.session.userID = result[0].userID
                req.session.login = true
                req.session.cookie.maxAge = 900000
                if(result[0].role == "manager"){
                    req.session.role = result[0].role
                    res.redirect('/home')
                }
                else{
                    req.session.role = result[0].role
                    res.redirect('/homeNormal')
                }
           }
       }
   })
})


//Logout
router.get ('/logout',(req,res)=>{
    var count = 0
    for(let i in req.cookies){
        if(req.cookies[i].length < 10){
            res.clearCookie(`${count}`)
            count++
            // console.log(count)
        }
    }
    req.session.destroy((err)=>{
        res.redirect('/')
    })
})

module.exports = router
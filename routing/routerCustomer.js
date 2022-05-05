const express = require('express')
const router = express.Router()
const dbConnection = require('../database');

router.get('/pay',(req,res)=>{
    res.redirect('/homecustomer')
})

//Select product that customer choose to show in Order page
router.get('/orderpage',(req,res)=>{
    const array = [] 
    for(let i in req.cookies){
        if(req.cookies[i].length < 10)
        array.push(req.cookies[i]);
    }
    if(array.length > 0){
        dbConnection.query(`SELECT * FROM product WHERE idproduct IN (${array.join(',')})`,(err,result) =>{
            if(err) console.log(err)
            else{
                // console.log(result)
                res.render('orderpage',{product:result})
            }
        })
    }
})

//Customer Home
router.get('/homecustomer',(req,res)=>{
    dbConnection.query("SELECT * FROM product",(err,result) =>{
        if(err) console.log(err)
        else{
            res.render('homeCustomer',{product:result})
        }
    })
})

module.exports = router
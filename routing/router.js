const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const dbConnection = require('../database');
const multer = require('multer');
const { redirect } = require('express/lib/response');
const { NULL } = require('mysql/lib/protocol/constants/types');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/img/products')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")
    }
})

const upload = multer({
    storage:storage
})
//post req.body.zzzz
//get req.query.zzzz
//params req.params.id  /:id /123

//homepage
router.get('/',(req,res)=>{
    dbConnection.query("SELECT * FROM product",(err,result) =>{
        if(err) console.log(err)
        else{
            res.render('home',{product:result})
        }
    })
})

//EditProduct
router.get('/editproduct',(req,res)=>{
    dbConnection.query("SELECT * FROM product",(err,result) =>{
        if(err) console.log(err)
        else{
            res.render('editProduct',{product:result})
        }
    })
})

//addProduct
router.get('/addproduct',(req,res)=>{
    res.render('addProduct')
})

router.post('/valificationLogin',(req,res)=>{
    console.log(req.body)
})

//Delete Product
router.post('/deleteProduct',(req,res)=>{
    var id = req.body.id
    var sql = `DELETE FROM product WHERE idproduct = ${id};`
    dbConnection.query(sql,(err,result) =>{
        if(err) console.log(err)
        else{
            res.redirect('editProduct')
            }
        })
})

//UpdateProduct
router.post('/updateP',(req,res)=>{
    var product = {
        id:parseInt(req.body.id),
        name:req.body.name,
        price: parseInt(req.body.price),
        total: parseInt(req.body.total)
    }
    var sql = `UPDATE product SET name = '${product.name}', price = ${product.price} , total = ${product.total} WHERE idproduct = ${product.id};`
    dbConnection.query(sql,(err,result) =>{
        if(err) console.log(err)
        else{
            res.redirect('editProduct')
        }
    })

})

//changeProduct
router.post('/changeProduct',(req,res)=>{
    var id = req.body.id
    dbConnection.query(`SELECT * FROM product WHERE idproduct = ${id};`,(err,result) =>{
        if(err) console.log(err)
        else{
            console.log(result)
            res.render('updateProduct',{product:result})
        }
    })

})

//Add Product
router.post('/additem',upload.single("pic"),(req,res)=>{
    var product = {
        id:parseInt(req.body.id),
        name:req.body.name,
        pic: req.file.filename,
        price: parseInt(req.body.price),
        total: parseInt(req.body.total)
    }
    // if(product.pic.length == 0)
    //     product.pic = null
    // console.log(req.body)
    // console.log("product" + product)
    // console.log("pic" + product.pic)
    var sql = `INSERT INTO product (idproduct, name, pic, price,total) VALUES (${product.id},'${product.name}','${product.pic}',${product.price},${product.total});`
    dbConnection.query(sql,(err,result) =>{
    if(err) console.log(err)
    else{
        res.redirect('addproduct')
        }
    })
})

module.exports = router

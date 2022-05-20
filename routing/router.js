const express = require('express')
const router = express.Router()
const dbConnection = require('../database');
const multer = require('multer');



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


//Select product show in homepage Emplpyee
router.get('/home',(req,res)=>{
    if(req.session.login && req.session.role == 'manager')
    dbConnection.query("SELECT * FROM product",(err,result) =>{
        if(err) console.log(err)
        else{
            res.render('home',{product:result})
        }
    })

    else
        res.render('login')
})

//Select product to show in Editpage Emplpyee
router.get('/editproduct',(req,res)=>{
    if(req.session.login && req.session.role == 'manager')
    dbConnection.query("SELECT * FROM product",(err,result) =>{
        if(err) console.log(err)
        else{
            res.render('editProduct',{product:result})
        }
    })
    else
        res.render('login')
})

//go to page Add Product
router.get('/addproduct',(req,res)=>{
    if(req.session.login && req.session.role == 'manager')
        res.render('addProduct')
    else
        res.render('login')

})

//Delete Product
router.post('/deleteProduct',(req,res)=>{
    if(req.session.login && req.session.role == 'manager'){
    var id = req.body.id
    var sql = `DELETE FROM product WHERE idproduct = ${id};`
    dbConnection.query(sql,(err,result) =>{
        if(err) console.log(err)
        else{
            res.redirect('editProduct')
            }
        })
    }
    else
        res.redirect('/home')
})

//Update Product data
router.post('/updateP',(req,res)=>{
    if(req.session.login && req.session.role == 'manager'){
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
}

else
        res.redirect('/home')

})

//SELECT product to show on edit page
router.post('/changeProduct',(req,res)=>{
    if(req.session.login && req.session.role == 'manager'){
    var id = req.body.id
    dbConnection.query(`SELECT * FROM product WHERE idproduct = ${id};`,(err,result) =>{
        if(err) console.log(err)
        else{
            // console.log(result)
            res.render('updateProduct',{product:result})
        }
    })
}

else
        res.redirect('/home')

})

//Add Product Emplpyee
router.post('/additem',upload.single("pic"),(req,res)=>{
    if(req.session.login && req.session.role == 'manager'){
        var pic = ""
        if(req.file === undefined){
            pic = ""
        }
        else{
            pic = req.file.filename
        }
    var product = {
        id:parseInt(req.body.id),
        name:req.body.name,
        // pic: req.file.filename,
        price: parseInt(req.body.price),
        total: parseInt(req.body.total)
    }
    var sql = `INSERT INTO product (idproduct, name, pic, price,total,userID) VALUES (${product.id},'${product.name}','${pic}',${product.price},${product.total},${req.session.userID});`
    dbConnection.query(sql,(err,result) =>{
    if(err) console.log(err)
    else{
        res.redirect('addproduct')
        }
    })
}
else
        res.redirect('/home')

})


router.get('/addemployee',(req,res)=>{
    if(req.session.login && req.session.role == 'manager'){
        res.render('addEmployee')
    }
    else
        res.redirect('/home')
})

//add  Employee
router.post('/insertEmployee',upload.single("pic"),(req,res)=>{
    if(req.session.login && req.session.role == 'manager'){
        // console.log(req.body)
        var pic = ""
        if(req.file === undefined){
            pic = ""
        }
        else{
            pic = req.file.filename
        }
        var sql = `INSERT INTO user VALUES (${parseInt(req.body.id)},'${req.body.fname}','${req.body.lname}','${req.body.gender}','${req.body.tel}','${pic}','${req.body.password}','${req.body.role}','${req.body.email}',${parseInt(req.body.salary)},'${req.body.username}','${req.body.address}','${req.body.about}' , ${req.session.userID});`
        console.log(sql)
        dbConnection.query(sql,(err,result) =>{
        if(err) console.log(err)
        else{
            res.redirect('/addemployee')
            }
        })
   }
    else
        res.redirect('/home')
})

//select data to show in profile
router.get('/profile',(req,res)=>{
   if(req.session.login){
        var username = req.session.username

        dbConnection.query(`SELECT * FROM user WHERE username = '${username}';`,(err,result) =>{
            if(err) console.log(err)
            else{
                // console.log(result)
                res.render('profile',{profile:result})
            }
        })
   }
   else
       res.redirect('/home')
})

//Select to show in edit page
router.get('/editProfile',(req,res)=>{
       if(req.session.login){
            var username = req.session.username
            dbConnection.query(`SELECT * FROM user WHERE username = '${username}';`,(err,result) =>{
                if(err) console.log(err)
                else{
                    // console.log(result)
                    res.render('editEmployee',{profile:result})
                }
            })
       }
       else
           res.redirect('/home')
    })
//update data from edit page
    router.post('/updateEmployee',(req,res)=>{
        if(req.session.login){
            // console.log(req.body)
            var sql = `UPDATE user SET fname = '${req.body.fname}', lname = '${req.body.lname}' , tel = '${req.body.tel}' , username = '${req.body.username}' , password = '${req.body.password}' , email = '${req.body.email}' , address = '${req.body.address}' , about = '${req.body.about}' WHERE userID = ${parseInt(req.body.id)};`
            // console.log(sql)
            dbConnection.query(sql,(err,result) =>{
                if(err) console.log(err)
                else{
                    res.redirect('/profile')
                }
            })
        }
        
        else
                res.redirect('/home')
        
        })

        router.get('/orderemployee',(req,res)=>{
            if(req.session.login){
                dbConnection.query(`SELECT * FROM orderProduct;`,(err,result) =>{
                    if(err) console.log(err)
                    else{
                        // console.log(result)
                        res.render('orderEmployee',{order:result})
                    }
                })
            }
            else
                res.redirect('/home')
         })

         router.post('/toSuccess',(req,res)=>{
            if(req.session.login){
                // console.log(req.body)
                var sql = `UPDATE orderProduct SET status = 'success', userID = ${req.session.userID} WHERE CustomerID = '${req.body.CustomerID}' AND idproduct = ${req.body.ProductID};`
                // console.log(sql)
                dbConnection.query(sql,(err,result) =>{
                    if(err) console.log(err)
                    else{
                        res.redirect('/orderemployee')
                    }
                })
            }
            else
                res.redirect('/home')
         })

         router.post('/toCancel',(req,res)=>{
            if(req.session.login){
                // console.log(req.body)
                var sql = `UPDATE orderProduct SET status = 'cancel' , userID = ${req.session.userID} WHERE CustomerID = '${req.body.CustomerID}' AND idproduct = ${req.body.ProductID};`
                // console.log(sql)
                dbConnection.query(sql,(err,result) =>{
                    if(err) console.log(err)
                    else{
                        res.redirect('/orderemployee')
                    }
                })
            }
            else
                res.redirect('/home')
         })

         router.get('/homeNormal',(req,res)=>{
            if(req.session.login && req.session.role != 'manager'){
                dbConnection.query("SELECT * FROM product",(err,result) =>{
                    if(err) console.log(err)
                    else{
                        res.render('homeNomal',{product:result})
                    }
                })
            }
            else
                res.redirect('/login')
         })

         router.get('/orderemployeeNormal',(req,res)=>{
            if(req.session.login){
                dbConnection.query(`SELECT * FROM orderProduct;`,(err,result) =>{
                    if(err) console.log(err)
                    else{
                        res.render('orderEmployeeNormal',{order:result})
                    }
                })
            }
            else
                res.redirect('/home')
         })

         router.get('/profileNormal',(req,res)=>{
            if(req.session.login){
                 var username = req.session.username
         
                 dbConnection.query(`SELECT * FROM user WHERE username = '${username}';`,(err,result) =>{
                     if(err) console.log(err)
                     else{
                         // console.log(result)
                         res.render('profileNormal',{profile:result})
                     }
                 })
            }
            else
                res.redirect('/home')
         })

         router.get('/editProfileNormal',(req,res)=>{
            if(req.session.login){
                 var username = req.session.username
                 dbConnection.query(`SELECT * FROM user WHERE username = '${username}';`,(err,result) =>{
                     if(err) console.log(err)
                     else{
                         // console.log(result)
                         res.render('editEmployeeNormal',{profile:result})
                     }
                 })
            }
            else
                res.redirect('/home')
         })

module.exports = router

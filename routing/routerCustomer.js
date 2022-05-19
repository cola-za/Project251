const express = require('express')
const router = express.Router()
const dbConnection = require('../database');

router.post('/pay',(req,res)=>{
    if(req.session.login){
    // console.log(req.body)
    var arrayID = req.body.fid.split('.')
    arrayID.pop()
    var arrayNum = req.body.fnum.split('.')
    arrayNum.pop()
    var arrayResult = req.body.fresult.split('.')
    arrayResult.pop()
    // console.log(arrayID)
    // console.log(arrayNum)
    for(x in arrayID){
        arrayID[x] = parseInt(arrayID[x])
        arrayNum[x] = parseInt(arrayNum[x])
        arrayResult[x] = parseInt(arrayResult[x])
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    // console.log(dateTime)

    for(x in arrayID){
        var sql = `INSERT INTO orderProduct VALUES ('${req.session.username}',${arrayID[x]},${arrayNum[x]},'${dateTime}','wait',NULL);`
        // console.log(sql)
        dbConnection.query(sql,(err,result) =>{
        if(err) 
            console.log(err)
        })

        var sql2 = `UPDATE product SET total = ${arrayResult[x]} WHERE idproduct = ${arrayID[x]};`
        dbConnection.query(sql2,(err,result) =>{
            if(err) 
                console.log(err)
            })
    }
    // console.log(arrayID)
    // console.log(arrayNum)
    // console.log(Date.now())
    // console.log(req.cookies)
    var count = 0
    for(let i in req.cookies){
        if(req.cookies[i].length < 10){
            res.clearCookie(`${count}`)
            count++
            // console.log(count)
        }
    }
    res.redirect('/homecustomer')
}
else{
        res.redirect('/')
}
})

//Select product that customer choose to show in Order page
router.get('/orderpage',(req,res)=>{
    if(req.session.login){
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
}
else{
    res.redirect('/')
}
})

//Customer Home
router.get('/homecustomer',(req,res)=>{
    if(req.session.login){
    dbConnection.query("SELECT * FROM product",(err,result) =>{
        if(err) console.log(err)
        else{
            res.render('homeCustomer',{product:result})
        }
    })
}

else{
    res.redirect('/')
}

})

router.get('/genID',(req,res)=>{
    req.session.username = String(Date.now())
    req.session.login = true
    req.session.cookie.maxAge = 900000
    var sql = `INSERT INTO customer VALUES (${(req.session.username)});`
        // console.log(sql)
        dbConnection.query(sql,(err,result) =>{
        if(err) console.log(err)
        else{
            res.redirect('/homecustomer')
            }
        })
})

module.exports = router
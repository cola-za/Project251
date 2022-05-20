const express = require('express');
const path = require('path');
const ejs = require('ejs');
//routing File
const router = require('./routing/router')
const routerlogin = require('./routing/routerLogin')
const routerCustomer = require('./routing/routerCustomer')

const cookieParser = require('cookie-parser')
const session = require('express-session')

//config need to do
/*Has to be this order */
const app = express();
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret:"mysession",resave:false,saveUninitialized:false}))
//Use Router
app.use(routerlogin)
app.use(router)
app.use(routerCustomer)

app.use(express.json())
app.use(express.static(path.join(__dirname ,'public')))


app.listen(8080, () => console.log("Server is running"))
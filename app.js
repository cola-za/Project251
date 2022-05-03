const express = require('express');
const path = require('path');
const ejs = require('ejs');
const router = require('./routing/router')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const cookie = require('cookie-session');
// const bcrypt = require('bcrypt');
// const {body, validationResult} = require('express-validator');
// const cookieSession = require('cookie-session');

//config need to do
/*Has to be this order */
const app = express();
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret:"mysession",resave:false,saveUninitialized:false}))
app.use(router)
app.use(express.json())
app.use(express.static(path.join(__dirname ,'public')))


app.listen(8080, () => console.log("Server is run"))
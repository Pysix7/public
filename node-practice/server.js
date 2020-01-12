const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRouter);
app.use(shopRouter);

app.use('/favicon.ico',(req,res,next)=>{res.sendStatus(204)});

app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

const port = 1000;

app.listen(port,()=>{console.log('listnentening on port',port)});
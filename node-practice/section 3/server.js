const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRouter);
app.use(shopRouter);

app.use('/favicon.ico',(req,res,next)=>{res.sendStatus(204)});

app.use((req, res, next)=>{
    res.status(404).send('<h1>Page not found!</h1>');
});

const port = 1000;

app.listen(port,()=>{console.log('listnentening on port',port)});
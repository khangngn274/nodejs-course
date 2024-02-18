const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
//ROUTES
const tourRouter = require('./routes/tourRoute')
const userRouter = require('./routes/userRoute')

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// 1) MIDDLEWARE 
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);    

//4) start server
module.exports = app;
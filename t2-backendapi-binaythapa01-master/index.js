const express = require('express');
const mongoose= require('mongoose');
const veriflyUser = require('./auth');
require('dotenv').config();
const cors = require('cors');
const employeeRouter = require('./routes/employeeRouter');
const leaveRouter = require('./routes/leaveRouter');
const userRouter = require('./routes/userRouter');
const app = express();

mongoose.connect('mongodb://127.0.0.1/Taskems', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true

})
    .then(()=> console.log('database server connection'))
    .catch((err) => console.log(err));

    app.use(cors('*'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false}));





app.get('/', (req, res) => {
    res.send('Welcome to app');
});




app.use('/api/user', userRouter);
app.use('/api/employee', veriflyUser, employeeRouter);
app.use('/api/leave', veriflyUser, leaveRouter);

app.use((req, res, next) => {
    let err = new Error('Not Found!');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err.message
    })
})

app.listen(process.env.Port, () => {
    console.log('server is running at localhost:  ${process.env.Port}');
});







const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const validation = require('../validation');

router.post('/register', (req, res, next) => {
    const {errors, isValid} = validation.registerInput(req.body)
    
    if (!isValid) {

       return res.status(400).json({
            status: 'erorr',
           message: errors
        });
    }
    let {username, password, firstname, lastname} = req.body;
        
    User.findOne({ username })
    .then((user) => {
        if(user) {
            let err = new Error('User already exists!');
            err.status = 401;
            return next (err);
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) return next (err);
            User.create({username, password: hash, firstname, lastname})
            .then ((user) => {
                res.json(user);
            }).catch(next);

        })
        
    }).catch(next);
})

router.post('/login', (req, res, next) => {

    let{username, password} = req.body;
    User.findOne({username})
         .then((user) => {

            if(!user) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(password, user.password)
             .then((isMatched) => {
                 if(!isMatched) {
                     let err = new Error('Password doesnot match');
                     err.status = 400;
                     return next(err);

                 }
                 const payload = {
                     id: user._id,
                     username: user.username,
                     firstname: user.firstname,
                     lastname: user.lastname
                 }
                 jwt.sign(payload, process.env.SECRET, {expiresIn: '4hr'}, (err, token) => {
                     //if(err) throw new Error('Token could not be created');
                     if(err) {
                         return next(err);
                    }
                     res.json({
                         status: 'login Sucessfull', 
                             //token
                             token: `Bearer ${token}`

                    });
                 })
             })
         }).catch(next);


})

module.exports = router;
const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const userRouter = require('../routes/userRouter');

const app = express();
app.use(express.json());
app.use('/user', userRouter );


beforeAll((done) => {
    mongoose.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then ((db) => {
        console.log('Connection ...');
        done();
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    })
})

afterAll((done) => {
    mongoose.disconnect().then (() => {
        console.log('Disconnecting...');
        done();
    });

})

describe('Test of User Router', () => {

    test('should able to resgister a user', () => {

        return request(app).post('/user/register')
        .send({
            username: 'usertest',
            password: 'testing',
            firstname: 'usertest1',
            lastname: 'lasttesting'
        })
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(201);
        })
        
    })

    test('should able to login', () => {
        return request(app).post('/user/login')
        .send({
            username: 'usertest',
            password: 'testing'
        }).then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
            expect(res.body.token).not.toBe('undefined');
        })
        
    })
    
    

} )



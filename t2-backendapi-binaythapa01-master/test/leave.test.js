const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const leaveRouter = require('../routes/leaveRouter');

const app = express();
 app.use (express.json());
 app.use ('/leave', leaveRouter);


 describe('Test of Leave Router', () => {

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

    let leaveID;

    test('should add the leave', () => {

        return request(app)
        .post('/leave')
        .send({
            firstname: 'leavetesting',
            lastname: 'lastleave',
            des: 'testing',
            days: '2'
        }).then ((res) => {
            console.log(res.body)
            leaveID = res.body._id;
            expect(res.statusCode).toBe(201);
            expect(res.body.firstname).toBe('leavetesting');
            
        })
        
    })

    test('should get all leave', () => {
        return request(app)
        .get('/leave')
        .then((res) => {
            console.log(res.body)
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].firstname).toBe('leavetesting');
        })
        
    })

    test('should get leave with id', () => {

        return request(app).get(`/leave/${leaveID}`)
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })

    test('should update leave data', () => {
        return request(app).put(`/leave/${leaveID}`)
        .send({
            firstname: 'updatetesting'
        })
        .then((res) => {
            console.log(res.body)
            expect(res.body.firstname).toBe('updatetesting');
        })
        
    })

    test('should delete the leave data', () => {
        return request(app).delete('/leave')
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })

    test('should delete leave data with id', () => {
        return request(app).delete(`/leave/${leaveID}`)
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })
    

 })


const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const employeeRouter = require('../routes/employeeRouter');


const app = express();
 app.use (express.json());
app.use('/employee', employeeRouter);

describe('Test of Employee Router', () => {

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

    let employeeId;

    test('should create the new employee', () => {

        return request(app)
        .post('/employee')
        .send({
            firstname: 'jesttest',
            lastname: 'lastjest',
            department: 'jest',
            post: 'jestsucess'
        }).then ((res) => {
            console.log(res.body)
            employeeId = res.body._id;
            expect(res.statusCode).toBe(201);
            expect(res.body.firstname).toBe('jesttest');
            
        })
        
    })

    test('should get all employee', () => {
        return request(app)
        .get('/employee')
        .then((res) => {
            console.log(res.body)
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].firstname).toBe('jesttest');
        })
        
    })

    test('should get employee with id', () => {

        return request(app).get(`/employee/${employeeId}`)
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })

    test('should update employee data', () => {
        return request(app).put(`/employee/${employeeId}`)
        .send({
            firstname: 'updatejest'
        })
        .then((res) => {
            console.log(res.body)
            expect(res.body.firstname).toBe('updatejest');
        })
        
    })

    test('should delete the employee data', () => {
        return request(app).delete('/employee')
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })

    test('should delete employee data with id', () => {
        return request(app).delete(`/employee/${employeeId}`)
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })
      
    
})


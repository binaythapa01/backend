const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee');


router.route('/')

   .get((req, res, next) => {
        Employee.find()
         .then((employee) =>
         {
             res.json(employee);
         }).catch(next);
   })

   .post((req, res, next) => {
       Employee.create(req.body)
       .then(employee => {
           res.status(201).json(employee)
       }).catch(next);

   })

   .delete((req, res, next) => {
       Employee.deleteMany()
        .then(reply => {
            res.json(reply);
        }).catch(next);



   })

   router.route('/:employee_id')

   .get((req, res, next) => {
       Employee.findById(req.params.employee_id)
       .then(employee => {
           res.json(employee);
       }).catch(next);
   })

   .put((req, res, next) => {
       Employee.findByIdAndUpdate(req.params.employee_id, {$set: req.body}, {new: true})
       .then(employees => {
           res.json(employees);
       }).catch(next);
   })

   .delete((req, res, next) => {
       Employee.deleteOne({_id: req.params.employee_id})
       .then(replay => {
           res.json(replay);
       }).catch(next);
   })

   module.exports = router;


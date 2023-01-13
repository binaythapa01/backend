const express = require('express');
const router = express.Router();
const Leave = require('../model/Leave');


router.route('/')

   .get((req, res, next) => {
        Leave.find()
         .then((leave) =>
         {
             res.json(leave);
         }).catch(next);
   })

   .post((req, res, next) => {
       Leave.create(req.body)
       .then(leave => {
           res.status(201).json(leave)
       }).catch(next);

   })

   .delete((req, res, next) => {
       Leave.deleteMany()
        .then(reply => {
            res.json(reply);
        }).catch(next);



   })

   router.route('/:leave_id')

   .get((req, res, next) => {
       Leave.findById(req.params.leave_id)
       .then(leave => {
           res.json(leave);
       }).catch(next);
   })

   .put((req, res, next) => {
       Leave.findByIdAndUpdate(req.params.leave_id, {$set: req.body}, {new: true})
       .then(leave => {
           res.json(leave);
       }).catch(next);
   })

   .delete((req, res, next) => {
       Leave.deleteOne({_id: req.params.leave_id})
       .then(replay => {
           res.json(replay);
       }).catch(next);
   })

   module.exports = router;


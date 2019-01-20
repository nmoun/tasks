const router = require('express').Router();
const Task = require('../models/tasks')
const { handleError } = require('../db')

// Fake validation of the order task
router.put('/:task?',  (req, res) => {
  const taskId = req.params.task;
  console.log('order validation')
  console.log("taskId: " + taskId)
  if(!taskId){
    res.statusCode(400).send('Task id is incorrect')
  } else if(isNaN(taskId)) {
    console.log('Task exists only on client')
    res.sendStatus(200);
  } else {
    // Delete
    Task.findOne({id: taskId}, function(err, task){
      if(err) handleError(err, res)
      if(task){
        Task.deleteOne({id: taskId}, function(err){
          if (err) handleError(err, res)
          res.sendStatus(200);
        })
      }else {
        res.statusCode(400).send('No existing task for the given id')
      }
    })
  }
})

module.exports = router
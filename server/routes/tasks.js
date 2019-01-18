const router = require('express').Router();
const Task = require('../models/tasks')
const {handleError} = require('../db')

router.get('/',  (req, res) => {
  Task.find().sort({type: 'asc'}).exec((err, result) => {
    if(err){
      res.sendStatus(500)
    }

    res.send(result)
  })
})

router.put('/:task?',  (req, res) => {
  const taskId = req.params.task;
  console.log("taskId: " + taskId)
  if(!taskId || isNaN(taskId)){
    // Create
    console.log('id not valid -> creation of task')

    const { title, type, header, articles } = req.body
    // Generates id
    Task.findOne().sort({id: 'desc'}).exec((err, task) => {
      if(err){
        handleError(err, res)
      }
      const id = parseInt(task.id, 10) + 1;
      console.log('task creation: new id: ' + id)
      Task.create({id, title, type, header, articles}, (err, createdTask) => {
        if(err){
          handleError(err, res)
        }
        console.log('task created')
        res.send({task: createdTask, tmpId: taskId})
      })
    })
  } else {
    // Update
    Task.findOne({id: taskId}, function(err, task){
      if(err) handleError(err, res)

      const { title, header, articles } = req.body
      if(task){
        console.log("task found")
        console.log("task update with:")
        console.log(JSON.stringify({title, header, articles}))
        task.set({title, header, articles})
        task.save(function(err, updatedTask) {
          if (err) handleError(err, res)
          res.send({task: updatedTask, tmpId: null});
        });
      }
    })
  }
})

module.exports = router
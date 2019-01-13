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
  if(!taskId){
    // Create
    console.log('no id -> creation of task')

    const { title, type, header, content } = req.body
    Task.findOne().sort({id: 'desc'}).exec((err, task) => {
      if(err){
        handleError(err, res)
      }
      const newId = parseInt(task.id, 10) + 1;
      console.log('task creation: new id: ' + newId)
      Task.create({id: newId, title, type, header, content}, (err, createdTask) => {
        if(err){
          handleError(err, res)
        }
        console.log('task created')
        res.send(createdTask)
      })
    })
  } else {
    // Update
    Task.findOne({id: taskId}, function(err, task){
      if(err) handleError(err, res)

      const { title, type, header, content } = req.body
      if(task){
        console.log("task found")
        console.log("task update with:")
        console.log(JSON.stringify({title, type, header, content}))
        task.set({title, type, header, content})
        task.save(function(err, updatedTask) {
          if (err) handleError(err, res)
          res.status(200).send(updatedTask);
        });
      }
    })
  }
})

module.exports = router
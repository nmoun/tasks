const router = require('express').Router();
const Task = require('../models/tasks')

router.get('/',  (req, res) => {
  Task.find((err, result) => {
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
    console.log('no id -> creation of task')
    res.sendStatus(200)
  }

  Task.findOne({id: taskId}, function(err, task){
    if(err) res.sendStatus(500)

    const { title, type, header, content } = req.body
    if(task){
      console.log("task found")
      console.log("task update with:")
      console.log(JSON.stringify({title, type, header, content}))
      task.set({title, type, header, content})
      task.save(function(err, updatedTask) {
        if (err) res.sendStatus(500)
        res.status(200).send(updatedTask);
      });
    }
  })
})

module.exports = router
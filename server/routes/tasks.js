const router = require('express').Router();
const Task = require('../models/tasks')

router.get('/',  (req, res) => {
  Task.find((err, result) => {
    if(err){
      console.log("error: "+ err)
    }

    res.send(result)
  })
})

module.exports = router
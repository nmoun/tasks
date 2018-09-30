const router = require('express').Router();
const passport = require('passport')

const tasks = [
  {
    id: 987,
    title: "Task 1"
  },
  {
    id: 9787,
    title: "Task 2"
  },
  {
    id: 55987,
    title: "Task 4"
  }
]

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send(tasks)
})

module.exports = router
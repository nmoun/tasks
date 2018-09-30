const router = require('express').Router();
const passport = require('passport')

const tasks = [
  {
    id: 987,
    title: "Task 1",
    type: 1
  },
  {
    id: 9787,
    title: "Task 2",
    type: 1
  },
  {
    id: 55987,
    title: "Task 4",
    type: 2
  }
]

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  setTimeout(() => {
    res.send(tasks)
  }, 300);
})

module.exports = router
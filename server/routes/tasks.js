const router = require('express').Router();
const passport = require('passport')

const tasks = [
  {
    id: 987,
    title: "Order task 1",
    type: "order"
  },
  {
    id: 9787,
    title: "Order task 2",
    type: "order"
  },
  {
    id: 55987,
    title: "Reception task 4",
    type: "reception"
  }
]

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  setTimeout(() => {
    res.send(tasks)
  }, 300);
})

module.exports = router
const router = require('express').Router();
const passport = require('passport')
const taskRouter = require('./tasks');
const authRouter = require('./auth');


router.use('/api', authRouter);

// protected route test, client must have a valid token
router.get('/api/authRequired', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send({'message': 'protected message'})
})

router.use('/api/tasks', passport.authenticate('jwt', {session: false}), taskRouter);

module.exports = router;
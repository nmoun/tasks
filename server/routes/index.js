const router = require('express').Router();
const passport = require('passport')
const taskRouter = require('./tasks');
const articleRouter = require('./articles');
const authRouter = require('./auth');


router.use('/api', authRouter);

// protected route test, client must have a valid token
router.get('/api/authRequired', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send({'message': 'protected message'})
})

router.use('/api/tasks', passport.authenticate('jwt', {session: false}), taskRouter);
router.use('/api/articles', passport.authenticate('jwt', {session: false}), articleRouter);

module.exports = router;
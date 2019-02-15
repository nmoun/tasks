const router = require('express').Router()
const passport = require('passport')
const taskRouter = require('./tasks')
const articleRouter = require('./articles')
const authRouter = require('./auth')
const orderRouter = require('./order')

router.use('/api', authRouter)
router.use('/api/tasks', passport.authenticate('jwt', {session: false}), taskRouter)
router.use('/api/articles', passport.authenticate('jwt', {session: false}), articleRouter)
router.use('/api/order', passport.authenticate('jwt', {session: false}), orderRouter)

module.exports = router
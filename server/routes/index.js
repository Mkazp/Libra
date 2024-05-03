const Router = require('express')
const router = new Router()
const favoriteRouter = require('./favoriteRouter')
const userRouter = require('./userRouter')
const bookRouter = require('./bookRouter')
const autorRouter = require('./authorRouter')

router.use('/user', userRouter)
router.use('/favorite', favoriteRouter)
router.use('/book', bookRouter)
router.use('/author', autorRouter)

module.exports = router
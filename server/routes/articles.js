const router = require('express').Router();
const { Article } = require('../models/articles')
const {handleError} = require('../db')

router.get('/',  (req, res) => {
  Article.find().sort({type: 'asc'}).exec((err, result) => {
    if(err){
      handleError(err, res)
    }

    res.send(result)
  })
})

router.get('/:articleCode',  (req, res) => {
  const articleCode = req.params.articleCode
  
  Article.aggregate()
    .match({ codes: { $in: [articleCode, "$codes"]}})
    .project({id: "$_id", description: 1, composition: 1, codes: 1})
    .project({_id: 0})
    .exec((err, result) => {
      if(err){
        console.log(JSON.stringify(err))
        handleError(err, res)
      }
      console.log('about to send response')
      res.send(result)
    })
})


module.exports = router
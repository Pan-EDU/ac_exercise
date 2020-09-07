// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Res = require('../../models/restaurants')

router.get('/', (req, res) => {
  Res.find({ name: { "$regex": req.query.keyword } })
    .lean()
    .then(restaurants =>
      res.render('index', { restaurants: restaurants })
    )
    .catch(err => console.error(err))
})

module.exports = router
const express = require('express')
const router = express.Router()

const Res = require('../../models/restaurants')

router.get('/name/:method', (req, res) => {
  const method = req.params.method
  Res.find()
    .lean()
    .sort({ name: method })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
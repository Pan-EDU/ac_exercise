const express = require('express')
const router = express.Router()
const Res = require('../../models/restaurants')

// 將 app 改成 router
// 把路由的前綴詞 /restaurants 刪掉，這一段已經在總路由器檢查完畢

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  return Res.create({ name: name, category: category, location: location, phone: phone, description: description })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:res_id', (req, res) => {
  const res_id = req.params.res_id
  return Res.findById(res_id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch((err) => console.error(err))
})

router.get('/:res_id/edit', (req, res) => {
  const res_id = req.params.res_id
  return Res.findById(res_id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch((err) => console.error(err))
})

router.put('/:res_id', (req, res) => {
  const res_id = req.params.res_id
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description

  return Res.findById(res_id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${res_id}`))
    .catch(err => console.error(err))
})

router.delete('/:res_id', (req, res) => {
  const res_id = req.params.res_id
  return Res.findById(res_id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

module.exports = router
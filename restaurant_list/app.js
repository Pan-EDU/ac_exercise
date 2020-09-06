const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Res = require('./models/restaurants')


// 宣告 伺服器
const app = express()
const port = 3000

// 設定 模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 stylesheets & javascript 路徑
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 設定 mongoose 的連線及確認連線狀況
mongoose.connect('mongodb://localhost/res-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// 路由設計
app.get('/', (req, res) => {
  Res.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

app.get('/search', (req, res) => {
  Res.find({ name: { "$regex": req.query.keyword } })
    .lean()
    .then(restaurants =>
      res.render('index', { restaurants: restaurants })
    )
    .catch(err => console.error(err))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  return Res.create({ name: name, category: category, location: location, phone: phone, description: description })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})


app.get('/restaurants/:res_id', (req, res) => {
  const res_id = req.params.res_id
  return Res.findById(res_id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch((err) => console.error(err))
})

app.get('/restaurants/:res_id/edit', (req, res) => {
  const res_id = req.params.res_id
  return Res.findById(res_id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch((err) => console.error(err))
})

app.post('/restaurants/:res_id/edit', (req, res) => {
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

app.post('/restaurants/:res_id/delete', (req, res) => {
  const res_id = req.params.res_id
  return Res.findById(res_id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})


// 監聽到指定 port 
app.listen(port, () => {
  console.log('This is my restaurant - list project.')
})
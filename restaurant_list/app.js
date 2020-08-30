const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restList = require('./restaurant.json')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { 'restaurants': restList.results })
})


app.get('/search', (req, res) => {
  const restaurants = restList.results.filter((res) => res.name.toString().toLowerCase().includes(req.query.keyword))
  res.render('index', { 'restaurants': restaurants, 'keyword': req.query.keyword })
})

app.get('/restaurants/:res_id', (req, res) => {
  const restaurant = restList.results.find((res) => res.id.toString() === req.params.res_id)
  res.render('show', { 'restaurant': restaurant })
})


app.listen(port, () => {
  console.log('This is my restaurant - list project.')
})
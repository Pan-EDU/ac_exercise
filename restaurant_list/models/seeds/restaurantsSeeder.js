const moongoose = require('mongoose')
const Res = require('../restaurants')
const restList = require('./restaurants.json')
moongoose.connect('mongodb://localhost/res-list', { useNewUrlParser: true, useUnifiedTopology: true })
// Get the status of connection of database
const db = moongoose.connection
// Connect fail..
db.on('error', () => {
  console.log('mongodb error!')

})
// Connect successfully
db.once('open', () => {
  console.log('mongodb connected!')
  restList.results.forEach(item => {
    Res.create({
      id: item.id,
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  })
  console.log('done')
})

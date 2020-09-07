const Res = require('../restaurants')
const restList = require('./restaurants.json')
const db = require('../../config/mongoose')

// Connect successfully
db.once('open', () => {
  console.log('mongodb connected!')
  restList.results.forEach(item => {
    Res.create({
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
const moongoose = require('mongoose')
const Todo = require('../todo')
moongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// Get the status of connection of database
const db = moongoose.connection
// Connect fail..
db.on('error', () => {
  console.log('mongodb error!')
})
// Connect successfully
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})

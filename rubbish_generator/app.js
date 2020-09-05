// Include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateRubbish = require('./generate_rubbish')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set the css/js file's path
app.use(express.static('public'))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const options = req.body
  const converted_options = {}
  let rubbish = ''
  if (typeof (options.target) == 'undefined') {
    rubbish = '身為一個程式使用者，知道如何使用程式是很正常的吧!'
  } else {
    converted_options.target == options.target
    if (options.target === 'engineer') {
      converted_options.engineer = 1
    } else if (options.target === 'designer') {
      converted_options.designer = 1
    } else if (options.target === 'funder') {
      converted_options.funder = 1
    }
    rubbish = generateRubbish(options.target)
  }

  res.render('index', { converted_options: converted_options, rubbish: rubbish })
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})
const express = require('express')
const path = require('path')
const posts = require('./routes/posts.route')
const logger = require('./middleware/logger.mid')
const errorHandler = require('./middleware/error.mid')


const httpConf = {
  port: process.env.PORT || 8000
}


const app = express()


// "use" is a middleware that executes each request.
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // allow to receive HTML form data.
app.use(express.static(path.join(__dirname, 'public'))) // setup static folder.



app.get('/', (req, res) => {
  //res.send({ message: 'Hello' })
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>')
})

app.use('/api/posts', posts)


// errorHandler middleware must be after routes
app.use(errorHandler)




app.listen(httpConf.port, () => {
  console.log(`Server is running on port ${httpConf.port}`)
})

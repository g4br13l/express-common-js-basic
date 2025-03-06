const express = require('express')
const path = require('path')


const httpConf = {
  port: process.env.PORT || 8000
}


const app = express()



// setup static folder to use a static Server. "use" is a middleware.
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  //res.send({ message: 'Hello' })
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>')
})




const posts = [
  { id: 1, title: 'Post One' },
  { id: 2, title: 'Post Two' },
  { id: 3, title: 'Post Three' }
]


app.get('/api/posts', (req, res) => {
  console.log('req.query:', req.query)
  const limit = parseInt(req.query.limit)
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit))
  }
  return res.status(200).json(posts)

})

app.get('/api/posts/:id', (req, res) => {
  console.log('req.params:', req.params)
  const post = posts.find((post) => String(post.id) === req.params.id)
  if (!post) {
    return res.status(404).json({ message: `Post with id ${ req.params.id } not found.` })
  }
  return res.status(200).json(post)
})


app.listen(httpConf.port, () => {
  console.log(`Server is running on port ${httpConf.port}`)
})

const express = require('express')
const router = express.Router()



const posts = [
  { id: 1, title: 'Post One' },
  { id: 2, title: 'Post Two' },
  { id: 3, title: 'Post Three' }
]


router.get('/', (req, res) => {
  console.log('req.query:', req.query)
  const limit = parseInt(req.query.limit)
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit))
  }
  return res.status(200).json(posts)

})

router.get('/:id', (req, res) => {
  console.log('req.params:', req.params)
  const post = posts.find((post) => String(post.id) === req.params.id)
  if (!post) {
    return res.status(404).json({ message: `Post with id ${ req.params.id } not found.` })
  }
  return res.status(200).json(post)
})


export default router

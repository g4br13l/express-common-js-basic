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

router.get('/:id', (req, res, next) => {
  console.log('req.params:', req.params)
  const post = posts.find((post) => String(post.id) === req.params.id)
  if (!post) {
    //return res.status(404).json({ message: `Post with id ${ req.params.id } not found.` })
    const error = new Error(`Post with id ${ req.params.id } not found.`)
    error.status = 404
    return next(error)
  }
  return res.status(200).json(post)
})


router.post('/', (req, res) => {
  console.log(req.body)
  const body = req.body
  if (body && 'title' in body && typeof body['title'] === 'string') {
    const lastId = posts.length+1
    posts.push({ id: lastId, title: body.title })
    return res.status(201).json(posts)
  }
  return res.status(400).json({ msg: 'bad formatted request.' })
})


router.put('/:id', (req, res) => {
  const post = posts.find(post => String(post.id) === req.params.id)
  if (!post) {
    return res.status(404).json({ message: `Post with id ${ req.params.id } not found.` })
  }
  const body = req.body
  if (body && 'title' in body && typeof body['title'] === 'string') {
    posts[post.id-1] = { id: post.id, title: body.title }
    return res.status(201).json(posts)
  }
  return res.status(400).json({ msg: 'bad formatted request.' })
})

router.delete('/:id', (req, res) => {
  const postId = parseInt(req.params.id)
  if (!req.params.id || isNaN(postId)) return res.status(400)
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === postId) {
      const removedPost = posts.splice(i, 1)
      return res.status(200).json(removedPost)
    }
  }
  return res.status(404).json({msg: `Post with id "${postId}" not found.` })
})


module.exports = router

// It only works with Modules.
// export default router

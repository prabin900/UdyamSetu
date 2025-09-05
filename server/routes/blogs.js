const express = require('express');
const { createBlog, getBlogs, getUserBlogs, deleteBlog } = require('../controllers/blogController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createBlog);
router.get('/', getBlogs);
router.get('/my-blogs', auth, getUserBlogs);
router.delete('/:id', auth, deleteBlog);

module.exports = router;
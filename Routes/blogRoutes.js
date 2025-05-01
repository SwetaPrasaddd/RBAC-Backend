const express = require('express');
const router = express.Router();
const { getBlogs, createBlog, updateBlog, deleteBlog, getMyBlogs } = require('../Controllers/blogController');
const { protect } = require('../Middleware/authMiddleware');
const { authorizeRoles } = require('../Middleware/roleMiddleware');

router.get('/', getBlogs);
router.get('/:id', protect, getMyBlogs)
router.post('/:id', protect, createBlog);
router.patch('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;

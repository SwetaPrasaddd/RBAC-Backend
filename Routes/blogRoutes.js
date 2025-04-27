const express = require('express');
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost } = require('../Controllers/blogController');
const { protect } = require('../Middleware/authMiddleware');
const { authorizeRoles } = require('../Middleware/roleMiddleware');

router.get('/', getPosts);
router.post('/', protect, authorizeRoles('admin'), createPost);
router.put('/:id', protect, authorizeRoles('admin'), updatePost);
router.delete('/:id', protect, authorizeRoles('admin'), deletePost);

module.exports = router;

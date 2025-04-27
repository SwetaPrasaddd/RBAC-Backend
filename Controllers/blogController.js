const BlogPost = require('../Models/BlogPost');

const getPosts = async (req, res) => {
    const posts = await BlogPost.find().populate('author', 'name');
    res.json(posts);
};

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const newPost = await BlogPost.create({ title, content, author: req.user._id });
    res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const updatedPost = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPost);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);
    res.json({ message: 'Post deleted' });
};

module.exports = { getPosts, createPost, updatePost, deletePost };

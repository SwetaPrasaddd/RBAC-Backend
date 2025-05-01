const BlogPost = require('../Models/BlogPost');

// GET all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find().populate("author", "name email");
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyBlogs = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("Logged-in user ID:", userId);

        const blogs = await BlogPost.find({ author: userId }).populate('author', 'name email');

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found", user: req.user });
        }

        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// const getMyBlogs = async (req, res) => {
//     try {
//         // Assuming 'req.user' contains the logged-in user information (populated via JWT middleware)
//         const userId = req.user._id;
//         console.log(userId);


//         // Find blogs created by the logged-in user
//         const blogs = await BlogPost.find({ author: userId });

//         if (!blogs) {
//             return res.status(404).json({ message: "No blogs found" });
//         }

//         res.status(200).json(blogs);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// POST a blog (any logged-in user)

const createBlog = async (req, res) => {
    try {
        const newBlog = new BlogPost({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id,
        });

        const saved = await newBlog.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PATCH a blog (user can update own, admin can update any)
const updateBlog = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Allow only owner or admin
        if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized to update this blog" });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;

        const updated = await blog.save();
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE a blog (user can delete own, admin can delete any)
const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Allow only owner or admin
        if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized to delete this blog" });
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog, getMyBlogs };

const express = require('express');
const auth = require('../middleware/Auth');
const User = require('../model/User');
const Post = require('../model/Post');
const router = express.Router();
const path = require('path'); 
const multer=require('multer')
const storage=multer.diskStorage({
  destination:(req,file,cb)=>cb(null, path.join(__dirname,'..', 'uploads')),
  filename:(req,file,cb)=>cb(null,Date.now()+'-'+file.originalname)
})
const upload=multer({storage})
// Create a new post
router.post('/', auth,upload.single('image'), async (req, res) => {
  try {
    console.log('📸 req.file =>', req.file);
    console.log('📝 req.body =>', req.body);
    const user = await User.findById(req.user.id);
     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("✅ Image Path:", imagePath);
    const newPost = new Post({
      user: user._id,
      text: req.body.text,
      image:req.file ? `/uploads/${req.file.filename}` : null

    });
    

    await newPost.save();
    res.status(200).json({ message: "Post uploaded", post: newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts
router.get('/allposts', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name')
      .populate('comments.user','name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/myposts', auth, async (req, res) => {
  try {
    // req.user.id comes from JWT verification
    const posts = await Post.find({ user: req.user.id })
      .populate('user', 'name email') // include user's name/email
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like or unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(req.user.id);

    if (liked) {
      post.likes = post.likes.filter(uid => uid.toString() !== req.user.id);
      await post.save();
      return res.status(200).json({ message: "Post unliked", likes: post.likes.length });
    }

    post.likes.push(req.user.id);
    await post.save();
    res.status(200).json({ message: "Post liked", likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment on post
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user.id,
      text: req.body.text
    };

    post.comments.push(comment);
    await post.save();
    const updatedPost = await Post.findById(req.params.id)
      .populate('user', 'name')
      .populate('comments.user', 'name');

    res.status(200).json({ 
      message: "Comment added", 
      comments: updatedPost.comments 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit post
router.put('/:id/edit', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    post.text = req.body.text || post.text;
    await post.save();

    res.status(200).json({ message: "Post edited successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

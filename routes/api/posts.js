const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",

  async (req, res) => {
    try {
      const newPost = new Post({
        text: req.body.text,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// sort
router.get("/sort/:toggle", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: req.params.toggle });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;

const router = require('express').Router();
const blogPost = require('../models/blogPost');
const Post = require('../models/users');
const app = require("express")();
const ejs = require("ejs");
const express = require("express")
app.use(express.static("public"));


//create post 
var post = []

router.get("/compose", function(req, res){
  res.send("compose a blog");
});

router.post('/compose', async (req,res)=> {
    if (req.session.loggedin){
try {
    const savePost = await new Post({
        author: req.body.author,
        description: req.body.description,
        title: req.body.title,
        content: req.body.body
    }, post = savePost);
    const savedPost = await savePost.save()
    res.status(200).json(savedPost);

} catch (error) {
    res.status(500).json(error);
}
    }else{
        res.redirect('/login')
    }
})

//update post
router.put('/:id', async (req,res)=> {
 try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await Post.updateOne({$set:req.body});
     res.status(200).json('it has been updated')

    } else {
        res.status(403).json('you can only update your post');
    }
 } catch (error) {
     res.status(500).json(error)
 }

})
//delete post 
router.delete('/:id', async (req, res)=> {
  try {
   const post =  await Post.findById(req.params.id);
   if (post.userId === req.body.userId) {
      await Post.delete()
      res.status(200).json('the post is deleted')
   } else {
       res.status(403).json("you can only delete your post")
   }
  } catch (error) {
    res.status(500).json(error)  
  }

})
//get All posts 
router.get('/', async (req,res) => {
  try {
   const posts = await Post.find();
  res.status(200).json(posts);

  } catch (error) {
   res.status(500).json(error); 
  }
  res.send("this is the home route")
})
//get one post 
router.get('/:id',async(req,res)=> {

  try {
    const post = await Post.findById(req.params.id);
    post.readcount++
    await post.save()
    res.status(200).json(post);

  } catch (error) {
    res.status(500).json(error);

  }
});


module.exports = router;
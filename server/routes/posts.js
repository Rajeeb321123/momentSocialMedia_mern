// ROUTES FOR POST SHOWING AND UPDATEING LIKES

// / FROM OUR NPM INSTALLED PACKAGES
import express from "express";



//FROM OUR OWN CREATED COMPONENTS AND PAGES AND ASSETS AND MODELS

import {getFeedPosts,getUserPosts,likePost} from '../controllers/posts.js';
import {verifyToken} from "../middleware/auth.js";


const router =express.Router();



// READ

// grab the every single post  feed when we are on home page
// In getFeedPosts we can use AI and other ways to curate the post in big real life production app with advertisement as well
// but in our small app ,getFeedPosts will be just be sending feeds
// as we have : app.use("/posts", postRoutes); in index.js 
// then the true url for api call becomes: http://localhost:3001/posts
router.get("/",verifyToken,getFeedPosts);

// grabing the user post only
// as we have : app.use("/posts", postRoutes); in index.js 
// then the true url for api call becomes: http://localhost:3001/posts/userId/posts
router.get("/:userId/posts", verifyToken,getUserPosts)


// UPDATE

// for liking and unliking
router.patch("/:id/like",verifyToken,likePost);


export default router;
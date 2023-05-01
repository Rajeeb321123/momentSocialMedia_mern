// ROUTES FOR USER



// FROM OUR NPM INSTALLED PACKAGES
import express from "express";




//FROM OUR OWN CREATED COMPONENTS AND PAGES AND ASSETS AND MODELS
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
  } from "../controllers/users.js";
  import { verifyToken } from "../middleware/auth.js";


//SETTING UP OUR ROUTER
// below allow to identify that these routes be configured
// allow to have route in separate file for better looking code
const router= express.Router();

// READ
// we already done app.use("/user",userRoutes) in index.js so we are using userRoutes there so "/login" below will be changed to "/user/:id"
// "/:id" here :id is query string and we can grab id here
// adding our created verifytoken in middleware/user.js for security
// below grabbing user with id in controller folder
router.get("/:id", verifyToken, getUser);
// grabbing userFriends with id in controller user.js
router.get("/:id/friends", verifyToken, getUserFriends);


// UPDATE
// we need both current userId and FriendId
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;
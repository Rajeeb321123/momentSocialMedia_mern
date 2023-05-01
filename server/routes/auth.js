// routes for our auth



// FROM OUR NPM INSTALLED PACKAGES
import express from "express";



//FROM OUR OWN CREATED COMPONENTS AND PAGES AND ASSETS AND MODELS
import {login} from "../controllers/auth.js";


// SETTING UP OUR ROUTER
// below allow to identify that these routes be configured
// allow to have route in separate file for better looking code
const router = express.Router();

// we already done app.use("/auth",authRoutes) in index.js so we are using authRoutes there so "/login" below will be changed to "/auth/login"
router.post("/login",login)

export default router;

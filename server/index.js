// Main 






// FROM OUR NPM INSTALLED PACKAGES

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";






// fROM NATIVE OF NODE

// below two will help to properly set path when we configure directories
import path from "path";
import { fileURLToPath } from "url";






//FROM OUR OWN CREATED COMPONENTS AND PAGES AND ASSETS

import {register} from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
// fake data
import {users,posts} from "./data/index.js";
// Schema
import User from "./models/User.js"
import Post from "./models/Post.js";




//IMPORTING THE ROUTES

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from "./routes/posts.js";






// CONFIGURATION AND MIDDLEWARE

// __filename: configuration to grab file url , specifically only  when we use "type":"module", in package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv .config() let us use env
dotenv.config();

// invoking express so we can use our middleware
// middleware:just a fuction that run inbetween different things and request
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use(cors) invoke cors
app.use(cors());

// below setting  directories where we keep our asset 
// we are making simple app(using local storage)  but in real life production app , we would want to store them in actual storage or cloud
app.use("/assets", express.static(path.join(__dirname, "public/assets")));






// FILE STORAGE

// most of the way we are writing is comming from instruction provide for multer package in github repo website
// whenever someone upload file we need storage like we made below
const storage = multer.diskStorage({
    // if file uploaded to ours website it will be save in destination :"public/assets"
    destination: function (req, file, cb) {
        // destination of storage: public/assets
        cb(null, "public/assets");
    },
    //   name : saved as original name
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// for saving
const upload = multer({ storage });




// AUTHENTICATION

// ROUTES WITH FILES

// for post we arenot using separate routes folder as we need upload we created above
// route:"/auth/register"
//  and middleware:upload.single("picture") & we are uploading the picture in local in public/asset
// CONTROLLER:acutal login or main logic  or logic of endpoint :register
// register, createPost all are controllers
app.post("/auth/register", upload.single("picture"), register);
// for post
// picture is property , we can write whatever we want but it should align with frontend 
// Note: for create post we are not using post.js from routes folder as we need upload fuction from here
app.post("/posts", verifyToken, upload.single("picture"), createPost);



// ROUTES

// using our  route from separate route folder for our express to use  unlike above
// from authRoutes
app.use("/auth", authRoutes);
// from userRoutes
app.use("/users",userRoutes);
// from postRoutes
app.use("/posts", postRoutes);






// MONGOOSE SETUP

// 6001 is just backup if PORT doesnot work
const PORT = process.env.PORT || 6001;

// connection to mongodb atlas
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));


        // ADD FAKE DATA ONE TIME ONLY MANUALLY
        // User.insertMany(users);
        // Post.insertMany(posts);
        
    }
) .catch((error) => console.log(`${error} did not connect`));






// // Showing and Updating  POSTS CONTROLLER





// //FROM OUR OWN CREATED COMPONENTS AND PAGES AND ASSETS AND MODELS

// import Post from "../models/Post.js";
// import User from "../models/User.js"




// // CREATE

// export const createPost = async(req,res) =>{

//     try{
//         const {userId,description, picturePath} = req.body;
//         const user =await User.findById(userId);

//         const newPost = new Post({
//             userId,
//             firstName: user.firstName,
//             lastName:user.lastName,
//             loaction:user.location,
//             description,
//             userPicturePath:user.picturePath,
//             picturePath,

//             // likes
//             // start with 0 likes so, empty object but someone liked it it will be likes:{"someId:true"}
//             likes:{},
//             // comment is initially object 
//             comments:[],
//         })
        

//         // save() is mongoose fuction  to update the document
//         await newPost.save();


//         // grabbing all the post 
//         // as we add the post we need all the posts to show in frontend
//         const post =await Post.find();

//         // response to frontend
//         res.status(201).json(post)

//     }

//     catch(err){
//         res.status(409).json({message:err.message});
//     }
// };



// // READ

// // grab all the post
// export const getFeedPosts =async(req,res)=>{

//     try{

//         // grabbing all the post 
//         // as we add the post we need all the posts to show in frontend
//         const post =await Post.find();

//         // response to frontend
//         res.status(200).json(post)
//     }

//     catch(err){
//         res.status(404).json({message:err.message});
//     }
// };


// // grabbing the all userPosts
// export const getUserPosts =async(req,res)=>{

//     try{
        
//         // grabing the userId from the url or requested route
//         const {userId} =req.params;

//         // grabbing all user  posts 
//         // as we add the post we need all the posts to show in frontend
//         const post =await Post.find(userId);

//         // response to frontend
//         res.status(200).json(post)
//     }

//     catch(err){
//         res.status(404).json({message:err.message});
//     }
// };




// // UPDATE

// // likes
// export const likePost =async(req,res)=>{

//     try{

//         // grabing the Id from the url or requested route
//         const {id} =req.params;
//         // grabing the userId from the url or requested route
//         const {userId} =req.params;

//         // grabing post from id of post
//         const post =await Post.findById(id);
//         // checking the userId in post.likes
//         const isLiked = post.likes.get(userId);

//         // in frontend we will have like and  unlike fuctionalities(most of time :button)
//         if(isLiked){
//             // if user has liked the post then unliking by detleting userId from post.likes
//             post.likes.delete(userId,true);
//         }
//         else{
//             // if user hasnot liked the post than liking the post 
//             post.likes.set(userId,true);
//         }


//         // updating the specific post using findByIdAndUpdate
//         const updatePost =await Post.findByIdAndUpdate(
           
//             // post id
//             id,

//             // passing the post temporay variable of here to actual database variable in database
//             {likes:post.likes},

//             // making new object  and replacing old one
//             {new:true}

//         );

//         // respose to frontend
//         res.status(200).json(updatePost);
       
//     }

//     catch(err){
//         res.status(404).json({message:err.message});
//     }
// };





// // note : we consider how and what to return to front end , it is the main task of backend developer and it is what makes backend a little challenging


// // note: how we change  variable and data in database
// // first we grab them than we make temporary variable in code and then modify temporay variable then pass the variable and replace or update the old variable in database . look at the grab comments in above code


import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
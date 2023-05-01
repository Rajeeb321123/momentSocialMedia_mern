// MODEL OR SCHEMA FOR POST


// FROM OUR NPM INSTALLED PACKAGES

import mongoose from 'mongoose';


// CREATING THE POSTSCHEMA

const postSchema= mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },

        firstName:{
            type:String,
            required:true,
        },

        lastName:{
            type:String,
            required:true,
        },

       location:String,
       description:String,
       picturePath:String,
       userPicturePath:String,

       // for likes
       likes:{
        // in mongo db we use Map for object
        // it create a key value pair
        type:Map,
        // we like post we will be added to <Map but if we dont like it we will be removed from the Map
        // Map is more efficent rather than array of string for the like
        // Map or dictionaries or object we dont have to use loop like array of string from every single users and comparing their id
        // of :boolean is always true for like
        of:Boolean,
        // it will be like this =likes:{userid1:true, userId2 :true,...}
       },

      // just simple comment as array of string for our simple project with no separate schema but in production app we must separate schema 
      comments:{
        type:Array,
        default:[]
      }

    },
    
    // TimeStamp
    // adding timestamps for our scehma objects
    // timestamps: to get current time
    // timestamps:true will provide automatic date when it is created and updated
    // very convinenet
    {timeStamps:true}

        
    
);

// passing our created userschema to Post and then to "Post" an save it as Post constant
const Post =mongoose.model("Post",postSchema);




export default Post;
























// NOTES:
// like : we are making an object with who liked the post
// comment: here in our simple project we have included in our Post schema by making it just an array of string but in real life production its should have its own schema for comments and replies to each comment
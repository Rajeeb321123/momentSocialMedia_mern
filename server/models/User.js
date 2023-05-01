// WE CAN IMPLEMENT OUR SCHEMA OR DATA MODEL OR ERD DIAGRAM HERE
// look at user part of the Data model diagram for understanding


// FROM OUR NPM INSTALLED PACKAGES

import mongoose from 'mongoose';





// CREATING THE USERSCHEMA


const UserSchema=new mongoose.Schema(

    // passing the objects

    {

        // monogo db create id itself

        firstName:{
            // setting the parameters
            type:String,
             // making the firstname required , min value 2 and max value 50
            required:true,
            min:2,
            max:50
        },

        lastName:{
            // setting the parameters
            type:String,
             // making the firstname required , min value 2 and max value 50
            required:true,
            min:2,
            max:50
        },

        email:{
            // setting the parameters
            type:String,
             // making the firstname required ,making it unique for avoiding duplication and max value 50
            required:true,
            max:50,
            unique:true
        },

        password:{
            // we are making simple password configuration but real life project we need more configuration or parameters
            // setting the parameters
            type:String,
             // making the firstname required , min value 5
            required:true,
            min:5,
            
        },

        // profile picure of user
        picturePath:{  
            type:String,
            default:"",
        },

        // friends of user
        friends:{
            type:Array,
            default:[]
        },

        // some extra objects
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number,


    },
    // adding timestamps for our scehma objects
    // timestamps: to get current time
    // timestamps:true will provide automatic date when it is created and updated
    // very convinenet
    {timestamps:true}

);





// passing our created userschema to User and then to "User" an save it as User constant
const User =mongoose.model("User",UserSchema);




export default User;


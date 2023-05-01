// authentication controller
// authentication is always most compicated part of backend

// note: in real life app , authentication is very vast and complex and done by third party company and whole team of developer , so it cant be hacked




// FROM OUR NPM INSTALLED PACKAGES

// encryption
import  bcrypt from "bcrypt";
// jwt provides the way for sending user web token which can be used for authorization
import jwt from "jsonwebtoken";





////FROM OUR OWN CREATED COMPONENTS AND PAGES AND ASSETS AND MODELS

import User from "../models/User.js"




// REGISTER USER

// creatin a register function
// similare to api or backend call in frontend , call to mongo database from bacjend should also be async
export const register = async (req, res) => {

    try{

        // destructureing from req
        // we need to setup frontend before setting destructured arguments lik below
        const{
            firstName,
            lastName,
            friends,
            email,
            password,
            picturePath,
            location,
            occupation

        } =req.body;

        // encryption
        const salt =await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt)


        const newUser= new User({

            firstName,
            lastName,
            friends,
            email,
            password:passwordHash,
            picturePath,
            location,
            occupation,
            // giving viewd profile dummy value . Real logic for it is very complex 
            viewedProfile:Math.floor(Math.random()*1000),
            impressions:Math.floor(Math.random()*1000),
        


        })

        // saving the newUser
        // save() is mongoose fuction  to update the document
        const savedUser= await newUser.save();

        // sending status code (201) to user or frontend that something is created 
        res.status(201).json(savedUser);

    }

    catch(err){

        // sending frontend that something is wrong
        // we can customize our error message but it is a simple app so we dont have do that
        res.status(500).jso({error:err.message});

    }
};




// LOGGING IN

// setting our login function
export const login = async  (req,res) =>{

    try{

        const {email,password} =req.body;

        // using mongoose to find specified email
        const user =await User.findOne({email:email});
        // if user doesnot exist
        if(!user) return res.status(400).json ({msg:"User doesnot exist."});

        // checking or matching the password
        const isMatch = await bcrypt.compare(password, user.password);
        // if password doesnot match
        if(!isMatch) return res.status(400).json ({msg:"Invalid Credentials."});


        // if user and password match
        // using jwt token
        // mixing the token with SECRET string we created in env for security
        const token =jwt.sign({id:user._id},process.env.JWT_SECREt);

        // removing the temporay user.password of in this code we got from req  which is equal to real password in database of user , so it dont get sent to frontend for security
        delete user.password;

        // response
        res.status(200).json({token,user});



    }

    catch(err){
        // we can customize our error message but it is a simple app so we dont have do that
        res.status(500).jso({error:err.message});

    }
}




// how password registration work
// we encrpt the password, we are going to save as  the registered password
// when user try to login , we are going to salt again
// check the password and registerd password
// if match we are going to provide jsonwebtoken to user




// note : we consider how and what to return to front end , it is the main task of backend developer and it is what makes backend a little challenging

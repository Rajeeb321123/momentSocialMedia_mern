// AUTHORIZATION

// logged in user can do things and hit some api endpoints that none loggedin user cant



// FROM OUR NPM INSTALLED PACKAGES

// jwt provides the way for sending user web token which can be used for authorization
//as jwt token is already provide to user, from controller/auth.js , we are to check or verify the those token here
import jwt from 'jsonwebtoken';


// VERIFY TOKEN

export const verifyToken =async(req,res,next) => {

    try{

        // from the  req from frontend , we are grabbing the Authorization header . setting it to token in backend. It means frontend will be setting the token
        let token =req.header("Authorization");

        // if token doesnot exist
        if(!token) {
            return res.status(403).send ("Access Denied")
        }

    

        // removing "Bearer " from token if it start with "Bearer "
        // space is must after Bearer means "Bearer "
        // we want the token starting with "Bearer "
        // "Bearer " is length of 7 , slicing it and removing the "Bearer " and taking everything beside it
        if (token.startsWith("Bearer ")){
            token =token.slice(7,token.length).trimLeft();
        }


        // actual verification
        const verified= jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;

        
        // next function : in middleware tp proceed to next step , look in google
        // eg: here in app.post("/posts",verifyToken,upload.single("picture",createPost)) or in router.patch("/:id/like",verifyToken,likePost);
        // verify token is middleware, after it check next stop like upload and likepost are initiated to executed with help of next();
        next();





    }

    catch(err){

        res.status(500).json({error:err.msessage})
    }
} ;

// we can pass verify token to any routes we like to protect it from unauthorized access
// // USER CONTROLLER




// ////FROM OUR OWN CREATED COMPONENTS AND PAGES AND ASSETS AND MODELS

// import User from "../models/User.js";




// // READ

// // GETTING THE USER
// export const getUser = async (req, res) => {

//     try {

//         // in user.js in routes folder we used router.get("/:id",verifyToken,getUser);
//         // grabbing the id from string 
//         const { id } = req.params;

//         // using the grabbed id to get User from data base
//         const user = await User.findById(id);



//         // response  to frontend 
//         res.status(200).json(user);


//     }

//     catch (err) {
//         // we can customize our error message but it is a simple app so we dont have do that
//         res.status(500).jso({ error: err.message });

//     }
// }

// // GET USER FRIENDS
// export const getUserFriends = async (req, res) => {

//     try {
//         // in user.js in routes folder we used router.get("/:id",verifyToken,getUserFriends);
//         // grabbing the id from string 
//         const { id } = req.params;

//         // using the grabbed id to get User from data base
//         const user = await User.findById(id);

//         // using Promise
//         // we also used promise in MovieInfo app , look at it
//         // Promise:for multiple api call in database
//         const friends = await Promise.all(
//             // multiple api call in iteration
//             user.friends.map((id) => User.findById(id))
//         );

//         // formating the proper way for frontend
//         const formattedFriends = friends.map(
//             ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//                 // just returning the object with all properties we grabed
//                 // { with properties..} is objct 
//                 return { _id, firstName, lastName, occupation, location, picturePath };

//             }

//         );

//         // response to frontend
//         res.status(200).json(formattedFriends);



//     }

//     catch (err) {
//         res.status(404).jso({ error: err.message });
//     }
// };




// //UPDATE

// // addRemoveFriend
// export const addRemoveFriend = async (req, res) => {
//     try {

//         // router.get("/:id/friends",verifyToken,getUserFriends) in user.js in routes folder
//         // grabbing the id and friendId from string
//         const { id, friendId } = req.params;

//         // using the grabbed id to get User from data base
//         const user = await User.findById(id);
//         // using the grabbed friendId to get userFriend from data base
//         const friend = await User.findById(friendId);

//         // if friend above is included as userfriend in user
//         //  then Removing from friend from the actual user using filter
//         if (user.friends.includes(friendId)) {
//             user.friends = user.friends.filter((id) => id !== friendId);
//             // also remove the actual user as friends from frienduser 
//             friend.friends = friend.friends.filter((id) => id !== id);
//         }

//         // if friend is not included as userfriend in user
//         else {
//             user.friends.push(friend(id));
//             friend.friends.push(id);
//         }

//         // saving the updated user and friend
//         // save() is mongoose fuction  to update the document
//         await user.save();
//         await friend.save();




//         // using Promise again  like in getUserFriends 
//         // we also used promise in MovieInfo app , look at it
//         // Promise:for multiple api call in database
//         const friends = await Promise.all(
//             // multiple api call in iteration
//             user.friends.map((id) => User.findById(id))
//         );

//         // formating again after update like in getUserFriends the proper way for frontend
//         const formattedFriends = friends.map(
//             ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//                 // just returning the object with all properties we grabed
//                 // { with properties..} is objct 
//                 return { _id, firstName, lastName, occupation, location, picturePath };

//             }

//         );

//         // updated response to frontend
//         res.status(200).json(formattedFriends);




//     }

//     catch (err) {
//         res.status(404).jso({ error: err.message });
//     }
// };






// // note : we consider how and what to return to front end , it is the main task of backend developer and it is what makes backend a little challenging

import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
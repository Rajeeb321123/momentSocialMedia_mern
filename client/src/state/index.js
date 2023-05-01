// // OUR REDUX STORE 




// // NPM PACKAGES

// import { createSlice } from "@reduxjs/toolkit";





// //OUR GLOBAL INITIAL STATE: accesible  and grabable through out our application

// const initialState={
    
//     //dark-light mode 
//     mode:"light",
//     //user: logged in user
//     user:null,
//     // Auth info
//     token:null,
//     // All post we need
//     posts:[],

// };





// export const authSlice= createSlice({

//     // property
//     name:"auth",
//     initialState,

//     // reducer:like functions for modifying global states
//     reducers:{
        
//         // changing mode
//         setMode:(state)=>{
//             state.mode = state.mode === "light" ?"dark":"light";
//         },

//         // action: like arg or parameter to fucntion , action comefrom outside 
//         // when we login
//         // setting user parameters using reducer 
//         setLogin:(state,action) =>{
//             state.user =action.payload.user;
//             state.token=action.payload.token;
//         },

//         // when we logout
//         // setting user parameters to null
//         setLogout:(state)=>{
//             state.user = null;
//             state.token = null;
//         },

//         // setting friends of logged in user
//         setFriends:(state,action)=>{
//             if(state.user) {
//                 state.user.friends =action.payload.friends
//             }
//             else{
//                 console.error("user friends non existent")
//             }
//         },

//         // all posts 
//         setPosts:(state,action)=>{
//             state.posts= action.payload.post;
//         },

//         // updated particular post
//         setPost:(state,action)=>{
//             const updatedPosts = state.posts.map((post)=>{

//                 // if post id matched than return new updated post for our updatedPosts array
//                 if(post._id === action.payload.post._id) return action.payload.post;
//                 // else return unchanged post as it is
//                 return post;

//             });

//             // replacing posts array  state with updatedPosts
//             state.posts= updatedPosts;
//         }
//     }
// })

// // exporting our created reducers(reducers:similar to fuciton)
// export const {setMode,setLogin, setLogout,setFriends,setPost,setPosts} = authSlice.actions;
// export default authSlice.reducer;


// // note: import or set this reducer in our main index.js file rather than each file

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
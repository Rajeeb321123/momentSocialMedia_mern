// HOME page





// NPM PACKAGES
import React from 'react'
import { Box, useMediaQuery } from "@mui/material";

// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import Navbar from 'scenes/navbar';
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from 'scenes/widgets/PostsWidget';

// REDUX STORE
import {useSelector} from "react-redux";




const HomePage = () => {


  // REDUCERS

  // we have saved whole user in redux store in user state when we logged in 
  // retrieving userInfo
  // we have used persist so data isnot lost in each reload
  const { _id, picturePath } = useSelector((state) => state.user);




  // INSTANCES

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")



  return (
    <Box>
      <Navbar/>

      <Box
        width = "100%"
        padding= "2rem 6%"
        // we want to show all three widget side by side in big screen using flex but in small screen we want to  show them on top of each other
        display = {isNonMobileScreens ? "flex": "block"}
        gap = "0.5rem"
        justifyContent="space-between"
      >

        {/* USER WIDGETS */}
        {/* flexBasis: specifies the initial size of the flex item, before any available space is distributed according to the flex factors */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>

          {/*Using our user widget component we created */}
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* MY POST WIDGETS ,POSTS WIDGET as ONE WIDGET IN MIDDLE*/}
        <Box

          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined: "2rem"}
        >

          {/* for Posting  */}
          <MyPostWidget picturePath={picturePath}/>

          {/* for seeing  all the posts */}
          <PostsWidget userId={_id} />
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}

      </Box>
    </Box>
  )
}

export default HomePage;
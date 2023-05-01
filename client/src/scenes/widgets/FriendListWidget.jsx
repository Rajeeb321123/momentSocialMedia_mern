// FOR SEEING OUR FRIEND LIST in right side of our home page


// NPM PACKAGES
import { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";

// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

// REDUX STORE
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";





const FriendListWidget = ({ userId }) => {

 
//  REDUCER

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);


  // INSTANCES

  const { palette } = useTheme();



  // BACKEND:API CALL
  
  const getFriends = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    // updating the friends of our redux store
    dispatch(setFriends({ friends: data }));
  };



  // USEEFFECT

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;

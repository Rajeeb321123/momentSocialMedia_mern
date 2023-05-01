// friend component
// for finding the person is friend or not of user : and icon for  add and remove them as friend in Post widget


import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  
 
 
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

//   user has friend arrray attached so, no need for separate api call
  const friends = useSelector((state) => state.user.friends);

  
  const navigate = useNavigate();
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

//   finding if the person is friend or no , friend._id is from friends of user  of redux store and friendId is the one we got as props
// if the person isnot friend we should see the icon for adding as friend
  const isFriend = friends.find((friend) => friend._id === friendId);

  
//   for adding the person  as friend in homepage
  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // updating user.friends of redux store
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            // navigating the friend profile
            navigate(`/profile/${friendId}`);
            // to solve the bug of our app . when we are in userProfile and go to other profile , but components donot rerender so,
            // navigate(0): is bad solution :refresh the page: but does the job here
            // not optimal way for real producion level app
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* remove and add friend */}
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;

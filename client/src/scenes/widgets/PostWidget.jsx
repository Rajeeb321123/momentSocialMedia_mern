// POSTWIDGET
// POST WIDGET(individual post)
// for showing the post when we click on it

// NPM PACKAGES

import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";

// OUR CREATED PAGES, COMPONENTS , STATES, THEME

import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

// REDUX STORE

import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    //REDUCER

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    // our loggend in userid
    const loggedInUserId = useSelector((state) => state.user._id);

    // USESTATES

    // isComment : for opening the comments list or not
    const [isComments, setIsComments] = useState(false);

    //INSTANCES

    // if logged in user has like the post or not
    // in backend , server , models or schema of post : likes:{type:Map,of:Boolean,}
    // it means like will be like : likes:{userid1:true, userId2 :true,...} and it can be always of true , no false, . & how we made it always true look at backend part of video
    // we can check for logged in userId in the array of likes

    const isLiked = Boolean(likes[loggedInUserId]);

    // likes is like key value pair i.e: likes:{userid1:true, userId2 :true,...}
    const likeCount = Object.keys(likes).length;

    // theme
    // usetheme to grab our colors . useTheme() is directly point to theme.js
    // we can also use like this: const { palette} = useTheme();
    const { palette } = useTheme();
    // grabbing the color from theme.js we created
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    //METHODS

    // BACKEND CALL , REQUEST , RESPONE METHODS: API CALL

    // for updating the likes
    const patchLike = async () => {
        //Api Calls(reques) and  Response from backend
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            // sending userId to like route of backend
            body: JSON.stringify({ userId: loggedInUserId }),
        });

        //   getting the Updated individual post as response
        const updatedPost = await response.json();

        //   updating the post in redux store
        // setPost also invoke the setPosts in it , inturn updateing the whole posts array
        dispatch(setPost({ post: updatedPost }));
    };

    // USEEFFECT

    return (
        <WidgetWrapper m="2rem 0">
            {/* for adding and removing as friend */}
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />

            {/* post description */}
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>

            {/* posted imaged */}
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
                />
            )}

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    {/* like/unlike section */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        {/* like cound */}
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    
                    {/* to open comment secion */}
                    <FlexBetween gap="0.3rem">
                        {/* for opening and closing comment section */}
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        {/* showing no of comments */}
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            
            
            </FlexBetween>
            {/* for showing and  commenting */}
            {isComments && (
                <Box mt="0.5rem">

                    {/* mapping through our comments */}
                    {/* comment is iterator */}
                    {/* i is index :0,1,2.....*/}
                    {comments.map((comment, i) => (

                        // index i (0,1,2,....) maynot be unique 
                        // but we need unique key , so we make a unique key `${name}-${i}`
                        // name is props provided from PostsWidget to PostWidget
                        // i.e name={`${firstName} ${lastName}`}
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;

// note:
// -----

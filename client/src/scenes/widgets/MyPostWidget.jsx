// MY POST WIGET
// for posting the post by user





// NPM PACKAGES

import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
// for Upload
import Dropzone from "react-dropzone";
import { useState } from "react";









// OUR CREATED PAGES, COMPONENTS , STATES, THEME

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";




// REDUX STORE

import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";





const MyPostWidget = ({ picturePath }) => {




    //REDUCER

    const dispatch = useDispatch();
    // grabbing id and token of user from backend
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // tip:token will be used for authorization for this user for authorizing user to upload the image





    // USESTATES

    // isImage is for is someone click the dropzone to open up the upload , set to false initially
    const [isImage, setIsImage] = useState(false);
    // image:actual dropped or uploaded image, set to null initially
    const [image, setImage] = useState(null);
    // post:actual post description or content
    const [post, setPost] = useState("");
    // grabbing the patatte from theme.js
    






    //INSTANCES 

    // grabbing the patatte from theme.js
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;















    //METHODS






    // BACKEND CALL , REQUEST , RESPONE METHODS: API CALL

    const handlePost = async () => {

        // formdata is must for image
        const formData = new FormData();


        // IMP: look at backend ,in createPost post contoller we have :const {userId,description, picturePath} = req.body; as request so we have to send all of them to server from frontend

        // copying _id to userId  and post to "description  and then appending userId and Description to  formdata
        formData.append("userId", _id);
        formData.append("description", post);

        // appending image as picture to formData
        if (image) {
            // in server we have : app.post("/posts", verifyToken, upload.single("picture"), createPost); so picture key must be sent
            formData.append("picture", image);
            // adding picturePath to formdataa. Mapping Image name (like image1.jpeg) to picutre path
            formData.append("picturePath", image.name);
        }


        // fuction
        //Api Calls(reques) and  Response from backend
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        // response 
        const posts = await response.json();

        // dispatching the respone i.e posts from backend to Posts state in redux 
        dispatch(setPosts({ posts }));

        // erasing image and post descroption
        setImage(null);
        setPost("");
    };












    // USEEFFECT





    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />

                {/* For Post Description */}
                <InputBase
                    placeholder="What's on your mind..."
                    
                    //on change here should update the Post state we created 
                    onChange={(e) => setPost(e.target.value)}
                    // value of post state and its changes is shown in while typing
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>

            {/* if Image is dropped */}
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >

                    {/* to know what is happening here in drop zone , look at comment of dropzone in UserWidget.jsx */}
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (

                                        // 
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            {/* EDIT button : none its own fuctionality  */}
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>

                                {/*IconButton:DElETE => if we want to remove or trash  the image  before sending it to backend */}
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                

                {/* ImageIcon for uploading image */}
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                     {/*we can see dropzone only aftere access or clicking here and clicking again will lead to disappering of dropzone again  */}
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                    {/* below fuctionality wont be implemented because we are doing a simple project here */}
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    // justing showing ... in mobile screen instead of clip, attachment and audio and we hadnot put any fucionality for them anyway
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}


                {/* button for post */}
                <Button
                // disable if no post (post description)
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
}

export default MyPostWidget;




  // note:
  // -----
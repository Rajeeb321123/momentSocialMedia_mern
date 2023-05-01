// GRABBING THE USERIMAGE SO WE CAN REUSE IT





// NPM PACKAGES

import { Box } from "@mui/material";









const UserImage = ({ image, size = "60px" }) => {



    return (
        <Box>
            <img
            width={size}
            height={size}
            styled={{ objectFit: "cover", borderRadius: "50%" }}
            alt="user"
            //  grabbing the image from  backend
            src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
            />
        

        </Box>
    );
}

export default UserImage;




  // note:
  // -----
// LOGIN PAGE






// NPM PACKAGES

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";








// OUR CREATED PAGES, COMPONENTS , STATES, THEME

import Form from "./Form";





// REDUX




const LoginPage = () => {




  //REDUCER










  //INSTANCES 

  const theme = useTheme();
  // from materialUi : useMediaQuery helps to determine the current screen size is below them min width or higher than min width
  // easy way to write media query inside react rather than mediaquery like in css ,we normally do
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");











  // USESTATES









  //METHODS







  // USEEFFECT





  return (
    <Box>

      {/* MOMENT LOGO AT TOP */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        // rem means root size
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"

        >
          Moments
        </Typography>
      </Box>


      {/* FORM */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Moments, the Social Media for Sharing and Storing your memories

        </Typography>

        {/* form component */}
        <Form />



      </Box>

    </Box>

  )
}

export default LoginPage;
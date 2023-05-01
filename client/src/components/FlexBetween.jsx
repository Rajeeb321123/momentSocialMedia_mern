// CSS COMPONENT: FlexBetween


// useful if we want to reusing lots of css component
// syntax is little weird 

// NPM PACKAGES
import { Box } from "@mui/material";
import { styled } from "@mui/system";


// creating component or constant flexBetween
// box helps to take  normal css like props
const FlexBetween =styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
})

export default FlexBetween;


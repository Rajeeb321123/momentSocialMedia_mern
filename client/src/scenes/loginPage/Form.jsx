// FORM for OUR LOGIN AND REGISTRATION






// NPM PACKAGES

import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// for our form library
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// Dropzone: for user-Upload functionality
import Dropzone from "react-dropzone";











// OUR CREATED PAGES, COMPONENTS , STATES, THEME

import FlexBetween from "components/FlexBetween";







// REDUX

import { useDispatch } from "react-redux";
import { setLogin } from "state";








//YUP VALIDATION for REGISTER SCHEMA

// this validation is to validate user input in form
// : determine the shape how form library will be saving info
const registerSchema = yup.object().shape({
    // below "required" is message if we donot provide properties value
    // also yup automatically find wrong input : eg for if symbols written in firstName 
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

// INITIAL VALUE FOR OUR PROPERTIES IN REGISTER SCHEMA
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",

};





// YUP VALIDATION FOR LOGIN SCHEMA

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

// INITIAL VALUE FOR OUR PROPERTIES IN REGISTER SCHEMA
const initialValuesLogin = {
    email: "",
    password: "",
};










function Form() {

    // USESTATES

    const [pageType, setPageType] = useState("login");




    //REDUCER

    const dispatch = useDispatch();








    //INSTANCES 

    const { palette } = useTheme();
    // from materialUi : useMediaQuery helps to determine the current screen size is below them min width or higher than min width
    // easy way to write media query inside react rather than mediaquery like in css ,we normally do
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const navigate = useNavigate();

    // checking page type is Login or registration
    // isLoging and isRegistration are boolean
    const isLogin = pageType === "login";
    const isRegistger = pageType === "register"











    











    //METHODS

    // values and onSubmitProps are coming from Formik
    const handleFormSubmit = async (values, onSubmitProps) => {

        // if pageType = Login
        if (isLogin) await login(values, onSubmitProps);

        // if pageType  = Register
        if (isRegistger) await register(values, onSubmitProps);

    };





    // BACKEND CALL , REQUEST , RESPONE METHODS : API CALLS

    // register call
    const register = async (values, onSubmitProps) => {

        // FormData() allow us to send form info with image
        // normally without image we could have just sent values as request to backend
        // formData is similar to object but with little changes
        const formData = new FormData();

        // setting value of formData with values of form
        for (let value in values) {
            formData.append(value, values[value])
        }

        // picutre path: here we have set the path of storage to server/public/assets look  index.js of server
        // this is done only if we have picture as values
        formData.append('picturePath', values.picture.name);


        //Api Calls(reques) and  Response from backend
        const savedUserResponse = await fetch(
            `${process.env.REACT_APP_BASE_URL}/auth/register`,
            {
                // method is post
                method: "POST",
                // body of call is our created formData
                body: formData,

            }
        );

        // saving our response in a parsable form(i.e JSON)
        const savedUser = await savedUserResponse.json();

        // reseting the fields of our form 
        onSubmitProps.resetForm();

        // after success of registration
        if (savedUser) {
            // renavigete to pageType Login
            setPageType("login")
        }

    };

    // login backend call
    const login = async (values, onSubmitProps) => {

        //Api Calls(reques) and  Response from backend
        const loggedInResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //   body: sending values , no need to format values as it is formatted already
            body: JSON.stringify(values),
        });

        // saving the response
        const loggedIn = await loggedInResponse.json();

        // resetting th form
        onSubmitProps.resetForm();

        // if Success
        if (loggedIn) {

            // dispatching to redux store
            dispatch(
                setLogin({
                    // setting user and token redux state from response  from backend
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );

            //   renavigate to home
            navigate("/home");
        }
    };








    // USEEFFECT





    return (

        <Formik
            onSubmit={handleFormSubmit}
            // we are initializing with initialValuesLogin or initalValuesRegister we created
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            // for validation
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {/* syntax is wild and weird , donot try to memorize , google it */}
            {({

                // we can use them in our <form> <div> and others
                // we getting them from Formik and can be used in indisde here
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,

            }) => (

                // what is formik doing : formik is passing handleFormSubmit to onSubmit like above , to handleSubmit  and we pass handle submit to onSubmit of <form> below
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"

                        // gridTemplateColumns: for form, grid:4section in each row of form:eg first Name:     lastName:    , there are only section beacause of minmax(0,1fr) meaning : if no parameter: it's will be '0'and existing parameter will take eqaul space beacuse of "1fr"
                        // we could have used 2 intsead of 4 here in our applicaiton but we take 4 just for insuring new parameter can be added in each row
                        gridTemplateColumns="repeat(4,minxmax(0,1fr))"

                        sx={{
                            // "& > div" means grabbing its each  child components (every component inside it)
                            // grindColumn is from above gridTemplateColumns="repeat(4,minxmax(0,1fr))" and imp: it has span:1 for each 4 column
                            // if: isNonMobile  we have to change the span of component to span 4 from span:1 so , it take full width
                            "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" },
                        }}
                    >


                        {/*FOR REGISTRAION PAGE only */}

                        {/* if Page is registraion */}
                        {isRegistger &&
                            (
                                <>

                                    {/* firstName field */}
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}

                                        // this value will be sent to handleSubmit  as in  values array of this form different componenets/fields  later on for backend call
                                        value={values.firstName}

                                        // imp: name should align with initialValuesRegister and registerSchema (i.e firstName)
                                        name="firstName"
                                        // showing errors , touched(from formik) if this field is touched or visited (if we have typed in in it) 
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}

                                        // confusion: i have check in my login page for what is happening with errors and its helpertext in reality 
                                        // helperText show error : errors is shown only if firstName field has been touched or typed or visited otherwise we show it hasnot beeb touche
                                        helperText={touched.firsName && errors.firsName}

                                        // for larger screen only ,in mobile screen it will be overridden by above we have wrote in "& > div"
                                        // take 2 space of 4 column grid , means take half width of form
                                        sx={{ gridColumn: "span 2" }}

                                    >
                                    </TextField>

                                    {/* lastName field */}
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: "span 2" }}
                                    />

                                    {/*Location field  */}
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        // take 4 space of 4 column grid , means take full width of form
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    {/* Occupaiton field */}
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="occupation"
                                        error={
                                            Boolean(touched.occupation) && Boolean(errors.occupation)
                                        }
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    {/* Little hard: box for inputing our profile image in registration */}
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                        p="1rem"
                                    >

                                        {/* UPlOAD */}
                                        {/* to pass or upload file file */}
                                        {/* it provide automatic configuration and validation */}
                                        <Dropzone
                                            // what are allowed
                                            acceptFiles=".jpg,.jpeg,.png"
                                            // no multiple files
                                            multiple={false}

                                            // onDrop : what  we do with the files after user drop the file
                                            onDrop={(acceptedFiles) =>
                                                // using setFieldValue from formik ,
                                                // "picture" is from picture of initialValuesRegister and registerSchema
                                                // IMP: setting value of picture with first file accepted from user(it is array) i.e acceptedFiles[0]
                                                setFieldValue("picture", acceptedFiles[0])}
                                        >

                                            {/* Again weird syntax, this time from Dropzone */}
                                            {/* passing getRootProps and getInputProps from Dropzone so, we can them */}

                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    // passing getRootProps into div ,we have to do this almost everytime with dropzone
                                                    {...getRootProps()}
                                                    border={`2px dashed ${palette.primary.main}`}
                                                    p="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                >
                                                    {/* for input of dropzone */}
                                                    <input {...getInputProps()} />

                                                    <input {...getInputProps()} />

                                                    {/* if user hasnot droped image */}
                                                    {!values.picture ? (
                                                        <p>Add Picture Here</p>
                                                    ) :

                                                        (
                                                            // if user has droped image we will be showing the name of picture
                                                            <FlexBetween>
                                                                <Typography>{values.picture.name}</Typography>
                                                                <EditOutlinedIcon />
                                                            </FlexBetween>
                                                        )}

                                                </Box>
                                            )}

                                        </Dropzone>
                                    </Box>
                                </>
                            )}



                        {/* FOR BOTH LOGIN AND RESISTRATION */}

                        {/* email */}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />

                        {/* password */}
                        <TextField
                            label="Password"
                            //   type password ensure it is hidden while typing
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />

                    </Box>




                    {/* BUTTONS */}

                    {/* for Login or register */}
                    <Box>
                        <Button
                            fullWidth
                            // as form has <form onSubmit={handleSubmit}> , type = "submit" referrs to onSubmit of form
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >

                            {/* button will switch between Login to register as per pageType */}
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>

                        {/* loin text in register page or register text in login page */}
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                // reset the content of form fields
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {/* switching login and register text */}
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>
                    </Box>

                </form>
            )}



        </Formik>



    );
}

export default Form;




// note:
// -----
// Registration and Login is same page but we contro what to show as per login and registraion using pageType state we created


// NPM PACKAGES

import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import { useMemo } from 'react';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';





// OUR CREATED PAGES, COMPONENTS , STATES, THEME

//  look due to our js config file we created we can do "scenes/homPage" instead of "./scenes/homePage" as for each import we can start from src
import HomePage from 'scenes/homePage';
import ProfilePage from 'scenes/profilePage';
import { themeSettings } from 'theme';
import LoginPage from 'scenes/loginPage';



// REDUX

import { useSelector } from 'react-redux';


function App() {


  // REDUCER

  // grabbing mode(light or dark from Reducer state store)
  const mode =useSelector((state) =>  state.mode)

  // grabbing token from redux
  // if token exist isAuth is true otherwise it is false
  const isAuth = Boolean(useSelector((state) => state.token));




  // USESTATES



  

  
  


  //INSTANCES 









  




 





  //METHODS




  //USE MEMO HOOK
  
  // :memory hook 
  //  memo means it memorize.  lets you cache the result of a calculation between re-renders. const cachedValue = useMemo(calculateValue, dependencies) 

  // theme for MUI
  const theme = useMemo(() => createTheme(themeSettings(mode),[mode]));




  // USEEFFECT





  return (
    <div className="app">
      
      {/* ROUTES */}
      <BrowserRouter>

      {/* If you wish to customize the theme, you need to use the ThemeProvider component in order to inject a theme into your application. NOTE: only needed only if we have modified MUI default theme like we did in theme.js */}
      <ThemeProvider theme={theme}>

        {/* cssBaseline reset css of different browsers. it provide consistent view of app over different browser */}
        {/* cssBaseline is similar to css_reset */}
        <CssBaseline>

        <Routes>
          {/*setting routes  */}

          {/* first page should be login */}
          <Route path='/' element={<LoginPage/>}/>

          {/* if isAuth true ,then only we should be in home page otherwise renavigate to login page */}
          <Route path='/home' element={ isAuth ? <HomePage/> : <Navigate to = '/' />}/>

          {/* sending parameter or param in url using ':' */}
           {/* if isAuth true ,then only we should be in Profile page otherwise renavigate to login page */}
          <Route path='/profile/:userId' element={isAuth ? <ProfilePage/>:<Navigate to = '/' />}/>
        </Routes>
        
        </CssBaseline>

        </ThemeProvider>

      </BrowserRouter>


    </div>
  );
}

export default App;




// note:
// -----

// elements : 1 global navbar, home page, profile page, login page, shared components,widgets: particular user, post, friendlist noneshared components

// js vs jsx : jsx means it has imported component in it : just for syntax and identifying

// for boolean const and varaible : good to use "is" like: isName





// MOST IMPORTANT TIP FOR ALL BACKEND ,FRONTEND, FULLSTACK developer:
// -------------------------------------------------------------------
// we have top preplan if changes in one page or widget leads to change in backend then it should have changes on othe area ,widgets or pages with related components as well . We have to plan for this in backend with Update and Read funcionality and should be applied in frontend also.
// seems obicvous but can be little challenging ,so use your perception for this
// in simple term frontend's all pages and component should in insync with backend


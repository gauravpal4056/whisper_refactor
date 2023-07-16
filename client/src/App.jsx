import Login from './pages/login/login'
import { useEffect, useState } from 'react'
import axios from "axios"
import { Navigate, Route, Routes,  } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { setName, setGoogleId, setUser } from './store/authSlice'
import Room from './pages/room/room'

import { createTheme, ThemeProvider } from '@mui/material';
import Nav from './component/nav/nav'
import Profile from './pages/profile/profile'


// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#e80384',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// };


function App() {

  const [mode, setMode] = useState(false)
  const darkMode= (mode) => {
    setMode(mode)
  }

  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      primary: {
        
        // Purple and green play nicely together.
        main: "#e80384",
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    }
    ,});

  const user = useSelector((state) => state.auth.user)
  const googleId = useSelector((state) => state.auth.googleId)
  const roomID = useSelector(state => state.auth.roomID)
  const dispatch = useDispatch()
  const getUser = async () => {
    const uid = localStorage.getItem("uid")
    if(uid){
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/checkUser/${uid}`
        const {data} = await axios.get(url);
        console.log(data);
        if(data.exist){
          dispatch(setUser(data.user))
          console.log("user_exists");
        }
        else{
          dispatch(setGoogleId(data.uid))
          dispatch(setName(data.displayName))
        }
      }catch (error) {
        console.log(error)
      }
    }
    
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      {/* <Login/> */}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route 
              exact path="/" 
              element = {user || googleId ? <Nav mode={mode} toggle={darkMode} /> : <Navigate to="/login" />}
          >
            <Route
              exact path="profile" 
              element = {user ? <Navigate to="/" /> : roomID ? <Profile /> : googleId ? <Navigate to="/room" /> : <Navigate to="/login" />}
            />
            <Route 
              exact path="/room" 
              element = {<Room />}
            />
          </Route>
          <Route 
            exact path="/login" 
            element = {user ?  <Navigate to="/" /> : googleId ? <Navigate to="/room" /> : <Login />}
          />
        </Routes>
      </ThemeProvider>
      
    </>
  )
}

export default App

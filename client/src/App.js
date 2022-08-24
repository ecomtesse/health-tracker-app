import {useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import FindDoctor from "./components/FindDoctor/FindDoctor"
import Login from './components/User/Login'
import Register from './components/User/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import './App.css' 


const theme = createTheme({
  shape: {
    borderRadius: 2
  },
  typography: {
    fontFamily: `"Proxima Nova", "Roboto", "sans serif"`
  },
  palette: {
    primary: {
      main: "#E65100"
    },
    secondary: {
      main: '#FF9800'
    },
    lighter: {
      main: "#ffffff"
    },
    default: {
      main: "#ED6C02"
    }
  }
})



function App() {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const handleAuth = (authed) => {
    // console.log(authed)
    setUser(authed)
    if(authed) {
      console.log('You successfully logged in')
      navigate("/")
    } else {
      console.log('Incorrect username details')
    }
  }

  // Function to check if user is logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch('/is-authenticated')
      const data = await res.json()
      console.log(data)
      setUser(data.user)
    }
    // on refresh, checks if user is authorised/logged in
    if (!user) checkLoggedIn()
  }, [])
  
  // Logout Function
  const handleLogout = async () => {
    const res = await fetch('logout', {
      method: 'POST'
    })
    const data = await res.json()
    if (data.success) {
      setUser(null)
      navigate("/login")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="page-container" >
          <Navbar handleLogout={handleLogout} />
          <Routes>
            
            <Route path="/" element={
              <ProtectedRoute user={user} >
                <Home /> 
              </ProtectedRoute>
             } />    
            <Route path="/login" element= {<Login handleLogin={handleAuth} />} />
            <Route path="/register" element= { <Register handleRegister={handleAuth} /> } />
            <Route path="/finddoctor" element= {<FindDoctor /> } />
          </Routes>
          <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;

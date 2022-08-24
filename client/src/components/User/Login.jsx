import { useState } from "react"
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';

const Login = ({ handleLogin }) => {
  const [fields, setFields] = useState({ username: '', password: '' })

  const handleChange = async (event) => {
    // console.log(event.target.value)
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(fields)
    })
    // console.log(res)
    const data = await res.json()
    // console.log(data.user)
    handleLogin(data.user)
  }

  return (
    <Container sx={{mb: 20}} component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}  
      >
      <Typography variant="h4" component="h1">Log In</Typography>    
        <form onSubmit={handleSubmit}>
          <TextField
            required
            value={fields.username}
            onChange={handleChange}
            name="username"
            type="text"
            id="username"
            label="username"
            autoFocus
          />
          <TextField
            required
            value={fields.password}
            onChange={handleChange}
            name="password"
            type="text"
            id="password"
            label="password"
          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link to='/signup' style={{textDecoration:'none'}}>
              Don't have an account? Sign Up
            </Link>
        </form>
      </Box>  
    </Container>

  )
}

export default Login
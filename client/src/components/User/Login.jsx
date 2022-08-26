import { useState } from "react"
import { Link } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import {Box, CardMedia} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Logo from '../../images/health-tracker.png'

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    })
    // console.log(res)
    const data = await res.json()
    // console.log(data.user)
    handleLogin(data.user)
  }

  return (
    <Container sx={{ mb: 20 }} component="main" maxWidth="xs">
      <Box className="logo" sx={{ width: "auto", maxWidth: 350, margin: "auto" }}>
        <CardMedia
          image={Logo}
          align="center"
          sx={{
            paddingTop: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >

        </CardMedia>
      </Box>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={fields.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  label="Username"
                  // type="username"
                  id="username"
                  autoComplete="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={fields.password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link to='/register' style={{ textDecoration: 'none' }}>
              Don't have an account? Sign Up
            </Link>
          </Box>
        </form>
      </Box>
    </Container>

  )
}

export default Login
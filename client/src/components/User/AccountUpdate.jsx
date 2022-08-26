import { useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Button, Grid, TextField, FormControl } from '@mui/material'

const AccountUpdate = ({ user, handleUpdate }) => {
  const [fields, setFields] = useState(
    { 
      username: user.username, 
      first_name: user.first_name || "",
      surname: user.surname || "",
      email: user.email || ""
    })
  const navigate = useNavigate()

  const handleChange = async (event) => {
    // console.log(event.target.value)
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    console.log(user)
    event.preventDefault()
    const res = await fetch(`/user/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    })
    console.log(res.ok)
    if (res.ok) {
      const updatedUser = await res.json()
      // console.log(updatedUser)
      handleUpdate(updatedUser)
      navigate('/user/details')
    } else {
      console.log("error updating user profile")
    }
  }

  return (
    <Container>
      <Typography variant="h2" component="h2" align='center' sx={{ my: 4 }}>Update Details</Typography>
      <Box align="center" sx={{ mx: 12, my: 6 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                sx={{ width: {sm: 300, md: 400 }}}
                value={fields.username}
                onChange={handleChange}
                name="username"
                type="text"
                label="Username"
                id="username"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: {sm: 300, md: 400 }}}
                value={fields.first_name}
                onChange={handleChange}
                name="first_name"
                label="First Name"
                id="first_name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: {sm: 300, md: 400 }}}
                value={fields.surname}
                onChange={handleChange}
                name="surname"
                label="Surname"
                id="surname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: {sm: 300, md: 400 }}}
                value={fields.email}
                onChange={handleChange}
                name="email"
                label="Email"
                id="surname"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: {sm: 300, md: 400 } }}
          >
            Update Details
          </Button>
        </form>

      </Box>

    </Container>
  )
}

export default AccountUpdate
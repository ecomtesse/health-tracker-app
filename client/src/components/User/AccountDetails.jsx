import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

const AccountDetails = ({ user }) => {
  // console.log(user);

  const navigate = useNavigate()

  const handleUpdate = () => {
    navigate(`/user/update`)
  }

  return (
    <Container>
      <Typography variant="h2" component="h2" align='center' sx={{ mt: 4 }}>My Details</Typography>
      <Box align="center" sx={{ mx: 12, my: 5 }}>
        <TableContainer >
          <Table sx={{ minWidth: 150, maxWidth: 400 }} aria-label="simple table">
            <TableBody >
              <TableRow>
                <TableCell align="left" sx={{ width: "50%", fontWeight: "bold" }} >Username:</TableCell>
                <TableCell align="left">{user.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ width: "50%", fontWeight: "bold"  }}>First Name:</TableCell>
                <TableCell align="left">{user.first_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ width: "50%", fontWeight: "bold"  }}>Surname:</TableCell>
                <TableCell align="left">{user.surname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ width: "50%", fontWeight: "bold"  }}>Email:</TableCell>
                <TableCell align="left">{user.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box align="center" sx={{ mx: 12 }}>
        <Button variant="contained" onClick={handleUpdate}>Update Details</Button>
      </Box>

    </Container>
  )
}

export default AccountDetails
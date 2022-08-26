import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material'
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import StraightenIcon from '@mui/icons-material/Straighten';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logo from '../../images/health-tracker.png'


const Home = ({ user }) => {
  const [userOverview, setUserOverview] = useState([])

  const getOverview = async () => {
    const url = '/home'
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    setUserOverview(data)
  }

  // console.log(userOverview[0]);

  useEffect(() => {
    getOverview()
  }, [])


  return (
    <Container>
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
      <Box variant="inherit" >
        <Typography variant='inherit' align="center">Welcome, {user.first_name ? user.first_name : user.username}! Here's you latest results:</Typography>
        <Grid container
          sx={{ p: 8 }}
          justify="space-between"
          spacing={4}>
          {userOverview.map((met) => {
            const keyName = Object.keys(met)[0]
            // console.log(keyName)
            let Icon
            let unit
            if (keyName === "weight") {
              Icon = <MonitorWeightIcon sx={{ fontSize: 120 }} />
              unit = "kg"
            } else if (keyName === "height") {
              Icon = <StraightenIcon sx={{ fontSize: 120 }} />
              unit = "cm"
            } else {
              Icon = <FavoriteIcon sx={{ fontSize: 120 }} />
              unit = "bpm"
            }
            return (
              <Grid item key={keyName} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/${keyName}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ bgcolor: "#fff3e0" }}>
                    <CardContent align="center">
                      <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>{keyName}</Typography>
                      {Icon}
                      <Typography variant="h3" component="p" sx={{ pb: 1 }}>{met[keyName][keyName]}{unit}</Typography>
                      <Typography>at {new Date(met[keyName].date).toLocaleDateString("en-AU")}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            )
          })}
          {/* { userOverview.length && <Grid item key="bmi" xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ bgcolor: "#fff3e0" }}>
              <CardContent align="center">
                <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>BMI</Typography>

                <Typography variant="h3" component="p" sx={{ pb: 1 }}>{userOverview[0].weight.weight / (userOverview[1].height.height ** 2)}</Typography>

              </CardContent>
            </Card>
          </Grid>} */}
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
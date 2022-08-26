import { useState } from 'react'
import { Link } from "react-router-dom"
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import Typography from '@mui/material/Typography'
import SmallLogo from '../../images/health-tracker-small.png'
// import Button from '@mui/material/Button'

const drawerWidth = 240

const navItems = [{
  text: "Home",
  path: '/',
},
{
  text: "Weight",
  path: '/weight',
},
{
  text: "Height",
  path: '/height',
},
{
  text: "Heart Rate",
  path: '/heart_rate',
},
{
  text: "Find A Doctor",
  path: '/finddoctor',
},
{
  text: "Account Details",
  path: '/user/details',
},
]
const Navbar = (props) => {
  const { window, handleLogout } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center " }}>
      <Typography sx={{ my: 2 }}>Health Tracker</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding >
            {/* {item.component} */}
            {/* <Link to={item.path} sx={{ textDecoration: "none"}}> */}
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText>
                <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>{item.text} </Link>
              </ListItemText>
            </ListItemButton>
            {/* </Link> */}
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box className="header" sx={{ display: 'flex' }}>
      <AppBar position="sticky" component="nav">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ display: { sm: 'block' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box> */}
          <Box
            variant="inherit"
            component="img"
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center", maxWidth: 40 }}
            src={SmallLogo}

          >

          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={() => handleLogout()}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            // display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

      </Box>
    </Box>
  )
}

export default Navbar

